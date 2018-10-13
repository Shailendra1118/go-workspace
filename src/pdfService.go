package main

import (
	"context"
	"fmt"
	"net/url"

	"github.com/mafredri/cdp"
	"github.com/mafredri/cdp/devtool"
	"github.com/mafredri/cdp/protocol/network"
	"github.com/mafredri/cdp/protocol/page"
	"github.com/mafredri/cdp/protocol/target"
	"github.com/mafredri/cdp/rpcc"
)

func main() {
	fmt.Println("Hello from main")
	ctx, cancel := context.WithCancel(context.TODO())
	defer cancel()
	CreatePdf(ctx, "http://localhost:3456/", 400, 300)
}

func main(ctx context.Context, urlRequest string, width float64, height float64) ([]byte, error) {

	
	// Use the DevTools API to manage targets
	var devt = devtool.New("http://127.0.0.1:3456")
	pt, _ := devt.Create(ctx)
	defer devt.Close(ctx, pt)

	// Open a new RPC connection to the Chrome Debugging Protocol target
	conn, _ := rpcc.DialContext(ctx, pt.WebSocketDebuggerURL)
	defer conn.Close()
	fmt.Println("pt.WebSocketDebuggerURL is" + pt.WebSocketDebuggerURL)

	// Create new browser context
	baseBrowser := cdp.NewClient(conn)
	newContextTarget, _ := baseBrowser.Target.CreateBrowserContext(ctx)

	// Create a new blank target with the new browser context
	newTargetArgs := target.NewCreateTargetArgs("about:blank").
		SetBrowserContextID(newContextTarget.BrowserContextID)
	newTarget, _ := baseBrowser.Target.CreateTarget(ctx, newTargetArgs)

	// Connect the client to the new target
	newTargetWsURL := fmt.Sprintf("ws://127.0.0.1:3456/devtools/page/%s", newTarget.TargetID)
	newContextConn, _ := rpcc.DialContext(ctx, newTargetWsURL)
	defer newContextConn.Close()
	c := cdp.NewClient(newContextConn)

	// Close the target when done
	// (In development, skip this step to leave tabs open!)
	closeTargetArgs := target.NewCloseTargetArgs(newTarget.TargetID)
	defer baseBrowser.Target.CloseTarget(ctx, closeTargetArgs)

	// Enable the runtime
	var err = c.Runtime.Enable(ctx)
	//fmt.Println(err)

	// Enable the network
	_ = c.Network.Enable(ctx, network.NewEnableArgs())

	// Enable events on the Page domain
	_ = c.Page.Enable(ctx)

	// Create a client to listen for the load event to be fired
	loadEventFiredClient, _ := c.Page.LoadEventFired(ctx)
	defer loadEventFiredClient.Close()

	// Tell the page to navigate to the URL
	urlParsed, _ := url.ParseRequestURI(urlRequest)
	fmt.Println(urlParsed)
	navArgs := page.NewNavigateArgs(urlRequest)
	nav, _ := c.Page.Navigate(ctx, navArgs)
	fmt.Println(nav)

	// Wait for the page to finish loading
	_, _ = loadEventFiredClient.Recv()

	// Print to PDF
	printToPDFArgs := page.NewPrintToPDFArgs().
		SetLandscape(true).
		SetPrintBackground(true).
		SetMarginTop(0).
		SetMarginBottom(0).
		SetMarginLeft(0).
		SetMarginRight(0).
		SetPrintBackground(true).
		SetPaperWidth(width).
		SetPaperHeight(height)
	print, _ := c.Page.PrintToPDF(ctx, printToPDFArgs)
	fmt.Print(print);
	return print.Data, nil
}	

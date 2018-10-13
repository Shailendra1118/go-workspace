package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"time"
	//"strconv"
	//"testing"
	"math/rand"

	"github.com/mafredri/cdp"
	"github.com/mafredri/cdp/devtool"
	//"github.com/mafredri/cdp/protocol/dom" error if imported and not used
	"github.com/mafredri/cdp/protocol/page"
	"github.com/mafredri/cdp/protocol/target" // added later
	"github.com/mafredri/cdp/protocol/network" // added later, use ?
	"github.com/mafredri/cdp/rpcc"
)

const localServ = "http://localhost:3456/";
const mediumPage = "https://medium.com/golangspec/import-declarations-in-go-8de0fd3ae8ff"
//const WSJ = "https://www.wsj.com/india"


func main() {
	goFetch(5, localServ)	
}

func goFetch(N int, url string){
	counter := 1
	for counter < N{
		start := time.Now()
		err := run(5 * time.Second, counter, url)
		t := time.Now()
		fmt.Printf("goFetch - total elaspsed time: "+t.Sub(start).String()+"\n")
		fmt.Print("------------------------------------------------------\n")
		if err != nil {
			log.Fatal(err)
		}

		counter += 1
	}
}


func run(timeout time.Duration, counter int, url string) error {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// Use the DevTools HTTP/JSON API to manage targets (e.g. pages, webworkers).
	start := time.Now()
	devt := devtool.New("http://127.0.0.1:9222")
	pt, err := devt.Get(ctx, devtool.Page)
	if err != nil {
		pt, err = devt.Create(ctx)
		if err != nil {
			return err
		}
	}
	t := time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" devtool connect \n")



	// Initiate a new RPC connection to the Chrome DevTools Protocol target.
	start = time.Now()
	conn, ctxerr := rpcc.DialContext(ctx, pt.WebSocketDebuggerURL)
	if ctxerr != nil {
		return ctxerr
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" new RPC connetion to cdp target \n")
	defer conn.Close() // Leaving connections open will leak memory.

    // ** new piece starts
	// Create new browser context 
	start = time.Now()
	baseBrowser := cdp.NewClient(conn)
	newContextTarget, bctxErr := baseBrowser.Target.CreateBrowserContext(ctx)
	if bctxErr != nil {
		return bctxErr
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to create new browser context \n")



	// Create a new blank target with the new browser context
	start = time.Now()
	newTargetArgs := target.NewCreateTargetArgs("about:blank").
		SetBrowserContextID(newContextTarget.BrowserContextID)
	newTarget, targetErr := baseBrowser.Target.CreateTarget(ctx, newTargetArgs)
	if targetErr != nil {
		return targetErr
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to create blank target using new browser context \n")



	// Connect the client to the new target
	start = time.Now()
	newTargetWsURL := fmt.Sprintf("ws://127.0.0.1:9222/devtools/page/%s", newTarget.TargetID)
	newContextConn, _ := rpcc.DialContext(ctx, newTargetWsURL)
	defer newContextConn.Close()
	c := cdp.NewClient(newContextConn)
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to connet the client to new target \n")

	// Close the target when done
	// (In development, skip this step to leave tabs open!)
	//closeTargetArgs := target.NewCloseTargetArgs(newTarget.TargetID)
	//defer baseBrowser.Target.CloseTarget(ctx, closeTargetArgs)



    // ** old way
	//start = time.Now()
	//c := cdp.NewClient(conn)
	//t = time.Now()
	//fmt.Printf("took "+t.Sub(start).String()+" cdp.NewClient(rpcConnection) \n")

	// Enable the runtime
	err = c.Runtime.Enable(ctx)
	if err != nil {
		return err
	}

	// Enable the network
	err = c.Network.Enable(ctx, network.NewEnableArgs())
	if err != nil {
		return err
	}

	// Enable events on the Page domain
	err = c.Page.Enable(ctx)
	if err != nil {
		return err
	}
	// ** new piece ends


	// Open a DOMContentEventFired client to buffer this event.
	/*start = time.Now()
	domContent, err := c.Page.DOMContentEventFired(ctx)
	if err != nil {
		return err
	}
	defer domContent.Close()
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to open DOMContentEventFired client \n") */

	// Create a client to listen for the load event to be fired
	start = time.Now()
	loadEventFiredClient, _ := c.Page.LoadEventFired(ctx)
	defer loadEventFiredClient.Close()
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to open LoadEventFired client \n")


	// Enable events on the Page domain, it's often preferrable to create
	// event clients before enabling events so that we don't miss any.
	// DECLARED above
	//if err = c.Page.Enable(ctx); err != nil {
	//	return err
	//}


	//main work
	// Create the Navigate arguments with the optional Referrer field set.
	navArgs := page.NewNavigateArgs(url).//("http://localhost:3456/"). //("https://www.google.com").
		SetReferrer("https://duckduckgo.com")
	start = time.Now()
	_, err = c.Page.Navigate(ctx, navArgs)
	if err != nil {
		return err
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to Navigate to URL \n")

	// Wait until we have a DOMContentEventFired event.
	/*start = time.Now()
	if _, err = domContent.Recv(); err != nil {
		return err
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to wait for DOMContentEventFired \n") */

	//fmt.Printf("Page loaded with frame ID: %s\n", nav.FrameID)
	start = time.Now()
	// Wait for the page to finish loading
	_, _ = loadEventFiredClient.Recv()
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to wait for LoadEventFired \n")



	// Capture a screenshot of the current page.
	/*screenshotName := "screenshot.jpg"
	screenshotArgs := page.NewCaptureScreenshotArgs().
		SetFormat("jpeg").
		SetQuality(80)
	screenshot, err := c.Page.CaptureScreenshot(ctx, screenshotArgs)
	if err != nil {
		return err
	}
	if err = ioutil.WriteFile(screenshotName, screenshot.Data, 0644); err != nil {
		return err
	}

	fmt.Printf("Saved screenshot: %s\n", screenshotName)*/


	// Save PDF.
	// Print to PDF
	printToPDFArgs := page.NewPrintToPDFArgs().
		//SetLandscape(true).
		SetPrintBackground(true).
		SetMarginTop(0).
		SetMarginBottom(0).
		SetMarginLeft(0).
		SetMarginRight(0).
		//SetPaperWidth(300).
		//SetPaperHeight(400).
		//SetPageRanges("1-4").
		SetScale(1)
		
	start = time.Now()
	print, err := c.Page.PrintToPDF(ctx, printToPDFArgs)
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to PrintToPDF to return data \n")

	if err != nil {
		return err
	}

	ctrStr := fmt.Sprintf("%f", rand.Float64())
	pdfName := "invoice"+ctrStr+".pdf"

	start = time.Now()
	if err = ioutil.WriteFile(pdfName, print.Data, 0644); err != nil {
		return err
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to write data to file \n")
	return nil

}
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
	"github.com/mafredri/cdp/rpcc"
)

const localServ = "http://localhost:3456/";
const mediumPage = "https://medium.com/golangspec/import-declarations-in-go-8de0fd3ae8ff"
//const WSJ = "https://www.wsj.com/india"


func main() {
	/*counter := 1
	for counter < 5{
		start := time.Now()
		err := run(5 * time.Second, counter)
		t := time.Now()
		fmt.Printf("From local running server - elaspsed time: "+t.Sub(start).String()+"\n")
		if err != nil {
			log.Fatal(err)
		}

		counter += 1
	}*/

	fromLocalNodeFetch(5, mediumPage)
	//fromWebWithImageNText(5, mediumPage)
	//fromWSJWithImageNText(5, WSJ)
	
}

func fromLocalNodeFetch(N int, url string){
	counter := 1
	for counter < N{
		start := time.Now()
		err := run(5 * time.Second, counter, url)
		t := time.Now()
		fmt.Printf("fromLocalNodeFetch - total elaspsed time: "+t.Sub(start).String()+"\n")
		fmt.Print("------------------------------------------------------\n")
		if err != nil {
			log.Fatal(err)
		}

		counter += 1
	}
}


func fromWebWithImageNText(N int, url string){
	counter := 1
	for counter < N{
		start := time.Now()
		err := run(5 * time.Second, counter, url)
		t := time.Now()
		fmt.Printf("fromWebWithImageNText - elaspsed time: "+t.Sub(start).String()+"\n")
		if err != nil {
			log.Fatal(err)
		}

		counter += 1
	}
}

func fromWSJWithImageNText(N int, url string){
	counter := 1
	for counter < N{
		start := time.Now()
		err := run(5 * time.Second, counter, url)
		t := time.Now()
		fmt.Printf("fromWebWithImageNText - elaspsed time: "+t.Sub(start).String()+"\n")
		if err != nil {
			log.Fatal(err)
		}

		counter += 1
	}
}

/*func BenchmarkPdfGeneration(b *testing.B) {  
    for n := 0; n < b.N; n++ {
        run( 2 * time.Second, 100)
    }
}*/



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
	conn, err := rpcc.DialContext(ctx, pt.WebSocketDebuggerURL)
	if err != nil {
		return err
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" new RPC connetion to cdp target \n")
	defer conn.Close() // Leaving connections open will leak memory.


	start = time.Now()
	c := cdp.NewClient(conn)
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" cdp.NewClient(rpcConnection) \n")


	// Open a DOMContentEventFired client to buffer this event.
	start = time.Now()
	domContent, err := c.Page.DOMContentEventFired(ctx)
	if err != nil {
		return err
	}
	defer domContent.Close()
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to open DOMContentEventFired client \n")



	// Enable events on the Page domain, it's often preferrable to create
	// event clients before enabling events so that we don't miss any.
	if err = c.Page.Enable(ctx); err != nil {
		return err
	}


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
	start = time.Now()
	if _, err = domContent.Recv(); err != nil {
		return err
	}
	t = time.Now()
	fmt.Printf("took "+t.Sub(start).String()+" to wait for DOMContentEventFireds \n")

	//fmt.Printf("Page loaded with frame ID: %s\n", nav.FrameID)


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
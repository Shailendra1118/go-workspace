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

//locally deplyed server having preloaded html
const localServ = "http://localhost:3456/";
// 6pages of text and few images
const mediumPage = "https://medium.com/golangspec/import-declarations-in-go-8de0fd3ae8ff"
//loads lot of content
const WSJ = "https://www.wsj.com/india"
//image heavy
const tumblr = "https://www.tumblr.com/"
const flickr = "https://www.flickr.com/explore"

//long list of comments/text
const reddit = "https://www.reddit.com/r/pics/comments/9ho1nh/a_drawing_i_did_that_im_proud_of/"


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

	//fromLocalNodeFetch(5, localServ)
	//fromWebWithImageNText(5, tumblr)
	fromWSJWithImageNText(5, flickr)
	
}

func fromLocalNodeFetch(N int, url string){
	counter := 1
	for counter < N{
		start := time.Now()
		err := run(5 * time.Second, counter, url)
		t := time.Now()
		fmt.Printf("fromLocalNodeFetch - elaspsed time: "+t.Sub(start).String()+"\n")
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
	//ctx, cancel := context.WithTimeout(context.Background(), timeout)
	//ctx := content.Background()
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Use the DevTools HTTP/JSON API to manage targets (e.g. pages, webworkers).
	devt := devtool.New("http://127.0.0.1:9222")
	pt, err := devt.Get(ctx, devtool.Page)
	if err != nil {
		pt, err = devt.Create(ctx)
		if err != nil {
			return err
		}
	}

	// Initiate a new RPC connection to the Chrome DevTools Protocol target.
	conn, err := rpcc.DialContext(ctx, pt.WebSocketDebuggerURL)
	if err != nil {
		return err
	}
	defer conn.Close() // Leaving connections open will leak memory.

	c := cdp.NewClient(conn)

	// Open a DOMContentEventFired client to buffer this event.
	domContent, err := c.Page.DOMContentEventFired(ctx)
	if err != nil {
		return err
	}
	defer domContent.Close()

	// Create a client to listen for the load event to be fired
	//loadEventFiredClient, _ := c.Page.LoadEventFired(ctx)
	//defer loadEventFiredClient.Close()

	// Enable events on the Page domain, it's often preferrable to create
	// event clients before enabling events so that we don't miss any.
	if err = c.Page.Enable(ctx); err != nil {
		return err
	}


	//main work
	// Create the Navigate arguments with the optional Referrer field set.
	navArgs := page.NewNavigateArgs(url).//("http://localhost:3456/"). //("https://www.google.com").
		SetReferrer("https://duckduckgo.com")
	_, err = c.Page.Navigate(ctx, navArgs)
	if err != nil {
		return err
	}

	// Wait until we have a DOMContentEventFired event.
	if _, err = domContent.Recv(); err != nil {
		return err
	}

	// Wait for the page to finish loading
	//_, _ = loadEventFiredClient.Recv()

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
		
	print, err := c.Page.PrintToPDF(ctx, printToPDFArgs)

	if err != nil {
		return err
	}
	ctrStr := fmt.Sprintf("%f", rand.Float64())
	pdfName := "invoice"+ctrStr+".pdf"
	if err = ioutil.WriteFile(pdfName, print.Data, 0644); err != nil {
		return err
	}

	return nil

}
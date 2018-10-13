package main

import (
	"fmt"
	"github.com/shail/sample/lib"
)

func main() {
	lib.Add("dr","Dart")
	fmt.Println(lib.Get("dr"))
	languages:=lib.GetAll()
	for _, v := range languages {
		fmt.Println(v)
	}
}
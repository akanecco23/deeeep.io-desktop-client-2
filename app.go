package main

import (
	"context"
	_ "embed"

	runtime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

//go:embed src/script.js
var script []byte

func (a App) domReady(ctx context.Context) {
	runtime.WindowExecJS(ctx, string(script))
}

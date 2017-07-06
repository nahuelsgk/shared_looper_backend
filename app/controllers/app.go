package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

/**
Go’s structs are typed collections of fields. They’re
useful for grouping data together to form records.
 */
type App struct {
	*revel.Controller
}

type AudioFile struct {
	Name, Url string

}

/** Adding CORS */
func addHeaderCORS(c *revel.Controller) revel.Result {
	c.Response.Out.Header().Add("Access-Control-Allow-Origin", "*")
	return nil
}

/** Controller constructor?? */
func init()  {
	revel.InterceptFunc(addHeaderCORS, revel.AFTER, &App{})
}

func (c App) Index() revel.Result {
	name := "Neo"
	return c.Render(name)
}

func (c App) Hello(myName string) revel.Result {
	c.Validation.Required(myName).Message("A name is required")
	c.Validation.MinSize(myName, 3).Message("The name must have at least 3 characters")

	if (c.Validation.HasErrors()) {
		revel.TRACE.Printf("%s", c.Validation.ErrorMap())
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(App.Index)
	}

	return c.Render(myName)
}

func (c App) AudioFilesList() revel.Result {
	audiolist:= []AudioFile{}

	files, _ := ioutil.ReadDir("./public/audios/kicks/")

	for _, f := range files {
		public_file_url := "http://localhost:9000/public/audios/kicks/" + f.Name()
		audio_file := AudioFile{f.Name(), public_file_url}
		audiolist = append(audiolist, audio_file)
	}

	return c.RenderJSON(audiolist)
}

func (c App) Upload() revel.Result {
	return c.Render()
}

func (c App) Bye() revel.Result {
	return c.Render();
}

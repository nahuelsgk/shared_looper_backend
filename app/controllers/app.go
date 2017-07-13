package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
	"github.com/nahuelsgk/sound-looper-backend/app/models"
	"encoding/json"
	"github.com/nahuelsgk/sound-looper-backend/app/database"
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

	user := &models.User{}
	json_data := map[string]string{"name": myName}
	json_bytes, err := json.Marshal(json_data)

	if err != nil {
		return c.RenderError(err)
	}

	json.Unmarshal(json_bytes, user)

	database.Users.Insert(user)

	return c.Render(myName)
}

func (c App) KicksFilesList() revel.Result {
	audiolist := getAudioAssetsFromFileSystem("kicks");
	return c.RenderJSON(audiolist)
}

func (c App) SnaresFilesList() revel.Result {
	audiolist := getAudioAssetsFromFileSystem("snares");
	return c.RenderJSON(audiolist)
}

func (c App) HiHatsFilesList() revel.Result {
	audiolist := getAudioAssetsFromFileSystem("hihats");
	return c.RenderJSON(audiolist)
}

func (c App) SoundFileList(section string) revel.Result {
	audioList := getAudioAssetsFromFileSystem(section)
	return c.RenderJSON(audioList)
}

func getAudioAssetsFromFileSystem(folder string) []AudioFile {
	audiolist := []AudioFile{}
	files, _ := ioutil.ReadDir("./public/audios/"+folder+"/")
	for _, f := range files {
		public_file_url := "http://localhost:9000/public/audios/"+folder+"/" + f.Name()
		audio_file := AudioFile{f.Name(), public_file_url}
		audiolist = append(audiolist, audio_file)
	}
	return audiolist
}

func (c App) Upload() revel.Result {
	return c.Render()
}

func (c App) Bye() revel.Result {
	return c.Render();
}

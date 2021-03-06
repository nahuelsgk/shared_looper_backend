package models

import (
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	ID 	 bson.ObjectId `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string		   `json:"name" bson:"name"`
}
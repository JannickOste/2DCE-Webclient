import { FontAlign } from "../FontAlign";
import GUI from "../../GUI";
import UIHorizontalMenu from "../components/UIHorizontalMenu";
import Tilemap, { Area } from "../../../entities/Tilemap";
import { Client } from "../../../net/Client";
export class StartMenu 
{
    static activeIndex = 0;
    static options = {
        Login:   () => {
            GUI.Flush();
            Client.Connect("hello", "hello world");
        },
        New_user: () => console.log("options")
    }

    static RenderMain(context) 
    {
        let width = window.innerWidth*.25;
        let height = window.innerHeight*.5;
        const x = (window.innerWidth*.5)-(width/2);
        const y = window.innerHeight*.25;
        const mainStyle = {
            fontAlign:     FontAlign.MID_CENTER,
            bgColor:       "rgb(40, 40, 40)",
            bgActiveColor: "rgb(70, 70, 70)",
            borderColor:   "rgb(55, 55, 55)",
            textColor:     "white",
            selectedIndex: StartMenu.activeIndex,
            minWidth: 300,
            maxWidth: 600
        };


        UIHorizontalMenu.Render(context, x, y, width, height, this.options, mainStyle);
    }

    static Render(context) 
    {
        this.RenderMain(context)
    }
    
    static Move(direction) 
    {
        const objectLength = Object.keys(StartMenu.options).length;
        switch(direction)
        {
            case "UP": 
                StartMenu.activeIndex += (StartMenu.activeIndex > 0 ? -1 : objectLength-1);
                break;
            case "DOWN":
                StartMenu.activeIndex += (StartMenu.activeIndex < objectLength-1 ? 1 : -(objectLength-1));
                break;
            case "ACTION":
                Object.values(StartMenu.options)[StartMenu.activeIndex]();
                break;
        }
    }
}
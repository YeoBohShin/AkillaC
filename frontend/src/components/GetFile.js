import { useState } from 'react'
import axios from "axios";

export default function GetFile() {
    const [profileData, setProfileData] = useState(null)

    function getData() {
        axios({
        method: "GET",
        url:"/profile",
        })
        .then((response) => {
        const res =response.data
        setProfileData(({
            profile_name: res.name,
            about_me: res.about}))
        }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}
    return (
        <div></div>)
    }
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Music = () => (
  <Layout>
    <SEO title="Music" />
    <h2>Music</h2>

    <p>I play guitar & banjo mostly, generally in the Piedmont Blues style (sometimes a bad Bluegrass style, sometimes an
    even badder Clawhammer). I also have a Yamaha Reface CP, an Omnichord OM-82, and a Teenage Engineering PO-32 which I
    mess around with. I normally just play for my own enjoyment but I want to be more confident with my playing so I'm
    going to record & upload some clips.</p>

    <p>The guitar below is an alternating thumb version of Lead Belly's Cotton Fields, the banjo is just some poor
    improvising.</p>

    <iframe width="100%" height="150" scrolling="no" frameborder="no" allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/869031178%3Fsecret_token%3Ds-jSr6v7lC8cz&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
  </Layout>
)

export default Music

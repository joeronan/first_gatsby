import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Music = () => (
  <Layout>
    <SEO title="Music" />
    <h1>Music</h1>

    <p>I play guitar & banjo, generally a very bad form of Piedmont Blues. I also have a couple synths, a drum machine, and I'm learning Logic Pro. I want to get better at sharing my music so I'm gonna upload bits & pieces here.</p>

    <p>This clip is mostly to test how well soundcloud integrates into my website. I recorded one take of me playing Cotton Field by Lead Belly and one take of weak banjo improv over the top. Apologies.</p>

    <iframe title="Cotton Fields" width="100%" height="150" scrolling="no" frameBorder="no" allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/869031178%3Fsecret_token%3Ds-jSr6v7lC8cz&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
  </Layout>
)

export default Music

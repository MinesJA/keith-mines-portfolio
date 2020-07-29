import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import MediaRoll from '../components/MediaRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const main = css`
  padding: 0.25em;
  margin: 25px;
`

export const IndexPageTemplate = ({
  image,
  bio,
}) => (
  <div css={main}>
    <h1 className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
      KEITH MINES
    </h1>
    <hr/>
    <div className="columns">
      <div className="column is-one-quarter">
        <PreviewCompatibleImage
          imageInfo={{
            image: image,
            alt: `featured img`,
          }}
        />
      </div>
      <div className="column">
        <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">
          Bio
        </h2>
        <p>{bio.description}</p>
      </div>
    </div>
    <hr/>
    <MediaRoll />
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  bio: PropTypes.object,
  media: PropTypes.object,
  publications: PropTypes.object
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  console.log(frontmatter)
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        bio={frontmatter.bio}
        media={frontmatter.media}
        publications={frontmatter.publications}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        bio {
          title
          description
        }
      }
    }
  }
`

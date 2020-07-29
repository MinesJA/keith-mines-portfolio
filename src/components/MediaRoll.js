import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import { css } from '@emotion/core'

const linkStyle = css`
  color: red;
  font-weight: 800;
`

const linkContainerStyle = css`
  text-align: right;
`

const subtitleStyle = css`
  font-style: italic;
  font-weight: 200;
  text-align: right;
`

const boxStyle = css`
  padding-bottom: 20px;
`

class MediaRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    
    const foreignPolicy = posts && posts.filter(({node: post}) => post.frontmatter.category == "Foreign Policy")
    const domesticPolicy = posts && posts.filter(({node: post}) => post.frontmatter.category == "Domestic Policy")
    const spiritual = posts && posts.filter(({node: post}) => post.frontmatter.category == "Spiritual")

    return (
      <div className="columns">
        <div className="column">
          <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">FOREIGN POLICY</h2>
          <hr/>
          {foreignPolicy.map(({node: post}) => (<MediaItem post={post}/>))}
        </div>
        
        <div className="column">
          <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">DOMESTIC POLICY</h2>
          <hr/>
          {domesticPolicy.map(({node: post}) => (<MediaItem post={post}/>))}
        </div>
        <div className="column">
          <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">SPIRITUAL</h2>
          <hr/>
          {spiritual.map(({node: post}) => (<MediaItem post={post}/>))}
        </div>
      </div>
    )
  }
}

const MediaItem = ({post}) => {
  const {id, frontmatter, excerpt, link} = post

  console.log(link)

  return (
    <div css={boxStyle} key={id}>
      <h2>{frontmatter.title}</h2>
      <p css={subtitleStyle}>{frontmatter.description}</p>
      <br />
      <p>
        {excerpt}
      </p>
      <p css={linkContainerStyle}>
        <a css={linkStyle} href={frontmatter.link} target="_blank">
          Read more...
        </a>
      </p> 
    </div>
  )
}

MediaRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query MediaRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "media-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                publishedat
                category
                link
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MediaRoll data={data} count={count} />}
  />
)


{/* <div className="columns">
<div className="column">
  <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">
    Media
  </h2>
  {console.log(media)}
  {media.map((p)=>
    <div css={listItem}>
      <p>{p.title}</p>
      <Link to={p.link}>-- New Yorker</Link>
    </div>
 )}
</div>
<div className="column">
  <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">
    Media
  </h2>
  {console.log(media)}
  {media.map((p)=>
    <div css={listItem}>
      <p>{p.title}</p>
      <Link to={p.link}>-- New Yorker</Link>
    </div>
 )}
</div>
<div className="column">
  <h2 className="is-size-2-mobile is-size-2-tablet is-size-4-widescreen">
    Media
  </h2>
  {console.log(media)}
  {media.map((p)=>
    <div css={listItem}>
      <p>{p.title}</p>
      <Link to={p.link}>-- New Yorker</Link>
    </div>
 )}
</div>
</div> */}
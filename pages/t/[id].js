import Link from 'next/link'
import { getPost } from '../../lib/post'
import styled from 'styled-components'
import Head from 'next/head'

const PostComponent = styled.article`
  .title {
    h1 {
      font-size: 1.8rem;
      font-weight: 500;
      margin: 0;
    }

    .content {
      word-break: break-all;
    }

    &::after {
      display: block;
      content: '';
      background-color: ${({ theme }) => theme.tagBgColor};
      height: 1px;
      margin: 0.5rem -0.8rem;
    }
  }
`
const Comments = styled.div`
  margin: 1rem 0;
  .comment {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    img {
      border-radius: 0.3rem;
      align-self: flex-start;
      width: 48px;
      height: 48px;
    }

    .middle {
      flex: 1 1 auto;
      margin: 0 1rem;

      .ago {
        font-size: 12px;
        margin: 0 8px;
        color: #ccc;
      }

      .content {
        margin-top: 8px;
        word-break: break-all;
      }
    }

    .no {
      align-self: flex-start;
      color: #ccc;
      font-size: 0.8rem;
      span {
        padding: 3px 6px;
        border-radius: 12px;
        background: ${({ theme }) => theme.tagBgColor};
      }
    }
  }

  .item::after {
    display: block;
    content: '';
    background-color: ${({ theme }) => theme.tagBgColor};
    height: 1px;
    margin: 0.5rem -0.8rem;
  }
`

function createMarkup(content) {
  return { __html: content }
}

export default function Post({ title, content, author, replies }) {
  return (
    <>
      <Head>
        <title> {title} - V2EX</title>
      </Head>
      <PostComponent className="card">
        <div className="title">
          <h1>{title}</h1>
          <Link href="/member/[id]" as={`/member/${author}`}>
            <a>{author}</a>
          </Link>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={createMarkup(`${content}`)}
        />
      </PostComponent>
      <Comments className="card">
        {replies.map((r) => {
          return (
            <div className="item" key={r.no}>
              <div className="comment">
                <img alt={r.author} src={r.avatar_url} />
                <div className="middle">
                  <span>
                    <Link href="/member/[id]" as={`/member/${r.author}`}>
                      <a>{r.author}</a>
                    </Link>
                    <span className="ago">{r.ago}</span>
                  </span>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={createMarkup(`${r.content}`)}
                  />
                </div>
                <div className="no">
                  <span>{r.no}</span>
                </div>
              </div>
            </div>
          )
        })}
      </Comments>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const post = await getPost(ctx.params.id)
  return {
    props: { ...post },
  }
}

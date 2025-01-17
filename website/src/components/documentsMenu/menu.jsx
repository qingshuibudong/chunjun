import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import AppContainer from "../AppContainer"

/**
 * @description 目录解析
 * @param {nodes} 文件信息
 * @reference
 */

const MenuLayout = ({ children }) => {
  //nodes 是文档list的相关信息, 文档的详细路由是  /documents/{name}
  const data = useStaticQuery(graphql`
    query MyQuery {
      allFile(filter: { sourceInstanceName: { eq: "docs" }, extension: { eq: "md" }, ctime: {} }) {
        edges {
          node {
            id
            name
            parent {
              id
              ... on Directory {
                id
                name
              }
            }
            relativePath
            ctime
            modifiedTime
          }
        }
      }
    }
  `)

  // function buildMenu(nodes) {
  //   let id = 1
  //   const root = { children: [] }
  //   function linkToRoot(structrue, node) {
  //     let rootRef = root

  //     for (let i = 0; i < structrue.length - 1; i++) {
  //       let dirname = structrue[i]
  //       let nextRef = rootRef.children.find(item => item.name === dirname)
  //       if (!nextRef) {
  //         nextRef = {
  //           type: "dir",
  //           name: dirname,
  //           id: id++,
  //           children: [],
  //           parent: rootRef,
  //         }
  //         rootRef.children.push(nextRef)
  //       }
  //       rootRef = nextRef
  //     }
  //     rootRef.children.push({
  //       type: "file",
  //       name: node.name,
  //       data: node,
  //       parent: rootRef,
  //     })
  //   }
  //   for (let i = 0; i < nodes.length; i++) {
  //     let node = nodes[i]
  //     let structrue = node.relativePath.split("/")
  //     if (structrue.length === 1) {
  //       root.children.push({
  //         type: "file",
  //         name: node.name,
  //         data: node,
  //         parent: root,
  //       })
  //     } else {
  //       linkToRoot(structrue, node)
  //     }
  //   }
  //   return root
  // }

  // const menuData = buildMenu(data.allFile.edges.map(item => item.node))
  // const currentPage = window.location.href.split("/").pop()

  // const buildChildren = children => {
  //   return children.map(c => {
  //     if (c.type === "dir") {
  //       return (
  //         <Accordion iconPosition="right">
  //           <Accordion.Item label={c.name}>{buildChildren(c.children)}</Accordion.Item>
  //         </Accordion>
  //       )
  //     } else {
  //       return (
  //         <Link to={`/documents/${c.data.id}`} className={`w-full px-[20px] m-0 rounded-sm cursor-pointer hover:bg-gray-100 h-[48px] flex items-center ${c.data.id === currentPage ? "active" : null}`}>
  //           {c.name}
  //         </Link>
  //       )
  //     }
  //   })
  // }

  // const asideMenu = menu => {
  //   const { children } = menu
  //   return (
  //     <Navbar className="hidden md:inline-block" hiddenBreakpoint="sm" width={{ sm: 200, lg: 256 }} height="100%" p="xs" style={{ zIndex: "1", height: "calc(100vh - 90px)", overflowY: "auto" }}>
  //       {children.map(item => {
  //         return item.type === "file" ? (
  //           <Link to={`/documents/${item.data.id}`} className={`w-full px-[20px] m-0 rounded-sm cursor-pointer hover:bg-gray-100 h-[48px] flex items-center ${item.data.id === currentPage ? "active" : null}`}>
  //             {item.name}
  //           </Link>
  //         ) : (
  //           <Accordion iconPosition="right">
  //             <Accordion.Item label={item.name}>{buildChildren(item.children)}</Accordion.Item>
  //           </Accordion>
  //         )
  //       })}
  //     </Navbar>
  //   )
  // }

  return (
    <AppContainer data={data} category="/documents">
      {children}
    </AppContainer>
  )
}

export default MenuLayout

// @flow strict
import React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../assets/mui-theme";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Page from "../components/Page";
import ContactForm from "../components/ContactForm/";

import { useSiteMetadata } from "../hooks";
import type { MarkdownRemark } from "../types";

type Props = {
  data: {
    markdownRemark: MarkdownRemark,
  },
};

const PageTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { htmlAst: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const {
    title: pageTitle,
    description: pageDescription,
    socialImage,
  } = frontmatter;
  const metaDescription =
    pageDescription !== null ? pageDescription : siteSubtitle;

  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      // "contact-form": ContactForm,
      "contact-form": ContactForm,
    },
  }).Compiler;

  return (
    <ThemeProvider theme={theme}>
      <Layout
        title={`${pageTitle} - ${siteTitle}`}
        description={metaDescription}
        socialImage={socialImage}
      >
        <Sidebar />
        <Page title={pageTitle}>
          <div>{renderAst(pageBody)}</div>
        </Page>
      </Layout>
    </ThemeProvider>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      htmlAst
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

export default PageTemplate;

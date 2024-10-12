/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "../../../utils/axios";

export default function EbookDetail({ ebook }: any) {
  return (
    <div>
      {" "}
      <h1>{ebook.title}</h1>{" "}
    </div>
  );
}

export const getStaticProps = (async ({ params }: any) => {
  const ebookId = params.ebookId.replace(/\-/g, "+");
  console.log(ebookId);
  const results = (await axios.get(`/contents/ebooks/${ebookId}`)).data;
  console.log(results);

  return {
    props: {
      ebook: results[0] || {},
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const ebooks = await axios.get(`/contents/ebooks`);
  console.log(ebooks.data);
  return {
    paths: ebooks?.data
      .map((ebook: any) => {
        const ebookId = ebook.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/\'/, "")
          .replace(/\(.+\)/, "");
        return {
          params: {
            ebookId,
          },
        };
      })
      .filter(({ params }: any) => !!params.ebookId),
    fallback: false,
  };
}) satisfies GetStaticPaths;

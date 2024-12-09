import { GetServerSideProps } from "next";

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = `User-agent: *
Allow: /

Sitemap: https://www.oramedcentr.com.ua/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robots);
  res.end();

  return {
    props: {},
  };
};

export default Robots;

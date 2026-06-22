import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Education from "../../sections/Education/Education";
import Skills from "../../sections/Skills/Skills";

/**
 * Lazy-loaded Sections
 */
const Hero = lazy(() => import("../../sections/Hero/Hero"));
const About = lazy(() => import("../../sections/About/About"));
const Leadership = lazy(() => import("../../sections/leadership/Leadership"));
const Achievements = lazy(() => import("../../sections/Achievement/Achievement"));
const Gallery = lazy(() => import("../../sections/Gallery/Gallery"));
const News = lazy(() => import("../../sections/News/News"));

/**
 * Loader Component (Reusable)
 */
const PageLoader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <p>Loading content...</p>
    </div>
  );
};

const Home = () => {
  return (
    <>
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>Home | Ibiono Ibom Chairman</title>
        <meta name="description" content="Official website of Ibiono Ibom Chairman. Stay updated with news, leadership, projects, and achievements." />
        <meta name="keywords" content="Ibiono Ibom, Chairman, Government, News, Projects, Leadership" />
      </Helmet>

      {/* ✅ Lazy Loaded Sections */}
      <Suspense fallback={<PageLoader />}>
        <Hero />
        <About />
        <Leadership />
        <Achievements />
        <Education/>
        <Skills/>
        <Gallery />
        <News />
      </Suspense>
    </>
  );
};

export default Home;

/**
 * Simple Inline Styles (You can move to CSS later)
 */
const styles = {
  loaderContainer: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTop: "4px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};




// import About from "../../sections/About/About";
// import Achievements from "../../sections/Achievement/Achievement";
// import Gallery from "../../sections/Gallery/Gallery";
// import Hero from "../../sections/Hero/Hero";
// import Leadership from "../../sections/leadership/Leadership";
// import News from "../../sections/News/News";
// import { Helmet } from "react-helmet-async";

// const Home = () => {
//   return (
//     <>

// <Helmet>
//   <title>Home | Ibiono Ibom Chairman</title>
// </Helmet>
//       <Hero />
//       <About/>
//       <Leadership />
//       <Achievements />
//       <Gallery />
//       <News />
//     </>
//   );
// };

// export default Home;


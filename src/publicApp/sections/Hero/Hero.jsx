import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../../services/api";
import Particles from "react-tsparticles";
import Tilt from "react-parallax-tilt";
import "./Hero.css";

const titles = [
  "Former Transition Chairman, Ibiono Ibom LGA",
  "Former Vice Chairman, Ibiono Ibom LGA",
  "Community Development Advocate",
  "Grassroots Mobilizer",
  "Experienced Public Servant"
];

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    API.get("/profile").then((res) =>
      setProfile(res.data[0])
    );
  }, []);

  useEffect(() => {
    let current = titles[index];
    let i = 0;

    const typing = setInterval(() => {
      setText(current.slice(0, i++));

      if (i > current.length) {
        clearInterval(typing);

        setTimeout(() => {
          setIndex(
            (prev) =>
              (prev + 1) % titles.length
          );
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [index]);

  if (!profile)
    return <p>Loading...</p>;

  return (
    <section className="hero">

      {/* PARTICLES */}
      <Particles
        className="particles"
        options={{
          particles: {
            number: {
              value: 40,
            },
            size: {
              value: 2,
            },
            move: {
              speed: 1,
            },
            opacity: {
              value: 0.5,
            },
          },
        }}
      />

      <div className="hero-container">

        {/* IMAGE */}
        <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.02}
            transitionSpeed={1000}
          >
          <motion.div
            className="hero-image-wrapper"
            initial={{
              opacity: 0,
              y: -40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="hero-avatar">

              <div className="image-ring">

                <div className="image-holder">

                  <img
                    src={profile.image}
                    alt={profile.name}
                  />

                </div>

              </div>

            </div>
          </motion.div>
        </Tilt>

        {/* TEXT */}
        <motion.div
          className="hero-text"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <h1>{profile.name}</h1>

          <h2 className="typing">
            {text}
          </h2>

          <p>{profile.bio}</p>

          <button
            className="btn glow"
            onClick={() =>
              document
                .getElementById(
                  "leadership"
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                })
            }
          >
            Explore Leadership
          </button>
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
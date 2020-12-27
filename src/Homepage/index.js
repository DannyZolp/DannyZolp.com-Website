import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faTwitter,
  faDiscord,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import './Homepage.css';
// import clubpenguin from '../static/clubpenguin.gif';

const GetRandomTagline = () => {
  const responses = [
    'I am an epic gamer',
    'Just a really cool dude',
    'I will make your software (probably)',
    'Give me your money',
    'Wagga Whu!',
    'Please text me I need friends',
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

export const Homepage = () => {
  return (
    <div>
      <div className="Homepage">
        <div className="container">
          <div className="header">
            <h1 className="title">Danny Zolp</h1>
            <h2>{GetRandomTagline()}</h2>
          </div>
          <div className="social">
            <a
              href="https://zolp.dev/github"
              className="media-button"
              data-testid="Github"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a
              href="https://zolp.dev/twitter"
              className="media-button"
              data-testid="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>{' '}
            <a
              href="https://zolp.dev/discord"
              className="media-button"
              data-testid="Discord"
            >
              <FontAwesomeIcon icon={faDiscord} size="2x" />
            </a>
            <a
              href="https://zolp.dev/youtube"
              className="media-button"
              data-testid="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a
              href="mailto:danny@zolp.dev"
              className="media-button"
              data-testid="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            {/* <a
              href="https://play.dannyzolp.com/"
              className="media-button"
              data-testid="ClubPenguin"
            >
              <img src={clubpenguin} height="32px" alt="club penguin" />
            </a> */}
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Made with love by Danny Zolp, Copyright 2020</p>
      </div>
    </div>
  );
};

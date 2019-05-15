## How to Run This Project
This project is a multi-repo project with a separate front-end and backend.

You need Postgres, Redis, Ruby, Rails, React, and Javascript on your machine to run this application locally.

For instructions on how to install Redis on your OS/machine, you can view the docs [here]().

### Steps

1. Get a TMDB API Key https://www.themoviedb.org/settings/api
2. Start Postgres, view docs here: https://www.postgresql.org/docs/9.1/server-start.html
3. Start Redis, via terminal `redis-server /usr/local/etc/redis.conf`
4. Install the Backend
   1. `git clone https://github.com/lassiter/discover-your-next-tv-show-front-end.git`
   2. CD into the directory where you cloned the repo.
   3. Change `../config/local_env.example.yml` to `../config/local_env.yml` and insert your TMDB API key to replace "foobar".
   4. Install the dependencies by running `bundle install`
   5. Start the server `rails s`
5. Install the Front-end
   1. `git clone https://github.com/lassiter/discover-your-next-tv-show.git`
   2. CD into the directory where you cloned the repo.
   3. In the root directory, create a file called `.env.local` and insert `REACT_APP_TMDB_API_KEY=yourapikeyhere` and replace "yourapikeyhere" with your TMDB API key.
   4. Install the dependencies by running `npm install`
   5. Start the server `npm start`
6. Visit http://localhost:3000 and you should see movie posters.


## Problem and Solution
### Problem
We want to see what the popular movies are and be able to learn a bit about them.
### Solution
We'll create a dashboard that shows us the latest movies via the The Movie DB API.

### Choices
There are a lot of different ways you could approach this but I decided to use a client-side full-stack react application to solve this problem. I also used a Rails backend as a microservice to handle search using WebSockets and Redis (ActiveCable).

For the react app, I structured three pages, the main App component that lists search and posters as links to Page component using dynamic page generation via routing. If you visit localhost:3000/Game-Of-Thrones a request is made to the rails server to find the [exported record](https://developers.themoviedb.org/3/getting-started/daily-file-exports) and return the object with a title, popularity, and id. The front end takes that data and sends it off to TMDB for more data which is used to render the page. The initial search comes from parsing the /:slug of "Game-Of-Thrones" to "Game Of Thrones".

For the backend, there are two main routes /search and /cable. /search handles all routing regarding the /:slug searches as individual pages. It returns 404 if not found, which then causes a redirect to the 404/NotFound component on the front-end. /cable handles the instant search and passes data back and forth with recommendations.

There is also a rake task which downloads the [daily exported TV Show records](https://developers.themoviedb.org/3/getting-started/daily-file-exports) and inputs them in the Postgres Database. There is also a SearchSuggestion model which has a seed method that is used to seed the Redis database. The key reason for keeping both on hand is speed for page initialization and instant search.

Styling is done via StyledComponents.

I think if I were to do this again, I would stick with the react front-end I have and micro-service but use a framework lighter than rails. If cost wasn't an issue, I'd offload the instant search to Algolia. However, with 80,000 records in Postgres and 750,000 keys in the Redis cache at 900mb. I'd also figure out a better way to handle the parsing when people visit a URL. One issue that I ran out of time with was figuring out the best way to handle multi-lingual url paths for instant search since the display language is always in english the the records are sorted by original name. I think if I had more time, I'd add a columns for the original name and english name and build a job that could pull the correct api for each.

Overall, I think my approach was solid. There are points that were good and many that can improve in quick project like this.

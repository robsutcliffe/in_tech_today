This is a simple blog post summariser that can be found here [https://ffeed.vercel.app/](https://ffeed.vercel.app/)  
Every day it finds and summarises a few interesting web developement blog posts on the internet.  

If you would like to change or create your own version of this application this is how to get started

## Creating a database
Run the script in the `/create.sql` file. This will create three database tables 
- **posts:** containing the summary of each blog posts and a link to the original posts  
- **tags:** common tags for a blog post. these will need to be manually checked every few days to approve any new tags  
- **posts_holding_pen:** this keeps a copy of the posts that are to be summarised. it also keeps a copy of posts we would like to ignore in future.

For our sql queries to all work we will also need to install two postgress extensions (also in `/create.sql`)
- **fuzzystrmatch:** used so the user can search old posts and they can include some spelling mistakes
- **pg_trgm:** used for matching words that sound similar and for grouping tags that are almost the same.

## Environment Variables
In the root you'll find a file called `.env.example`, copy this and call it `.env` add all the credentials for accessing your postgress database created above. 
I've used `Vercel` for the example site at [https://ffeed.vercel.app/](https://ffeed.vercel.app/) 

This will also require  
- and openai api key, to summarise the posts  
- a browserless api key, because vercel currently won't run chrome (if using other hosting you can search from puppeteer in the code and amend accordingly)

## Getting Started
Install all the dependencies using

```bash
npm install
```

and run using

```bash
npm run dev
```

## Cron Jobs
There are two apis for cron jobs  
- `/api/scrape/newHrefs` is used to get a few new posts a day this will 
- `/api/scrape/nextSummary` will summarise the post. upto 10 a day. 

the file `vercel.json` will tell vercel to run these each day. if hosting using another service this may require further set up.  
There are two seperate crom jobs to avoid Vercel timing out. you could combine into a single cron job if you change the hosting. 
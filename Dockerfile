FROM oven/bun:1.1.21

RUN mkdir -p /usr/src/public-experience-api
WORKDIR /usr/src/public-experience-api

# Setup npm
COPY package.json /usr/src/public-experience-api
COPY bun.lockb /usr/src/public-experience-api
COPY . /usr/src/public-experience-api

RUN bun i

CMD ["bun", "run", "deploy"]
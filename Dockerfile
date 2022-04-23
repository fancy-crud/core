FROM node:16.13.1

RUN userdel -r node

ARG user=frontend
ARG uid=1000
ARG gid=1000

RUN addgroup --gid $gid ${user}
RUN adduser --disabled-password --gecos '' --uid $uid --gid $gid ${user}

# RUN apt-get update \
#   && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

RUN npm install -g pnpm

USER ${user}

WORKDIR /home/${user}

RUN mkdir -p ${user}

WORKDIR /home/${user}/${user}

RUN mkdir -p node_modules

COPY package*.json ./

RUN pnpm install

RUN Xvfb :99 &
RUN export DISPLAY=:99

COPY . .

USER root
RUN chown -R ${user}:${user} node_modules
# RUN chown ${user}:${user} package-lock.json
USER ${user}

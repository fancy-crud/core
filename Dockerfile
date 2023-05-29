FROM node:16.13.1

ARG user=fancy-crud
ARG uid=1000
ARG gid=1000

RUN userdel -r node
RUN addgroup --gid $gid ${user}
RUN adduser --disabled-password --gecos '' --uid $uid --gid $gid ${user}

USER ${user}

RUN mkdir -p /home/${user}/${user}

WORKDIR /home/${user}/${user}

COPY --chown=${user}:${user} . .

CMD [ "./setup.sh" ]

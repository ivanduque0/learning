FROM node

ENV USUARIO=dev
ENV GRUPO=dev
ENV GID=1000
ENV UID=1000


RUN groupmod -g 1001 node && usermod -u 1001 node
RUN addgroup --system --GID $GID $GRUPO && adduser --system --UID $UID $USUARIO --ingroup $GRUPO
#RUN addgroup --system $GRUPO && adduser --system $USUARIO --ingroup $GRUPO

ENV DEV_HOME=/home/$USUARIO
#RUN mkdir $DEV_HOME
RUN chown -R $USUARIO:$GRUPO $DEV_HOME
WORKDIR $DEV_HOME
RUN npm install -g @nestjs/cli
USER $USUARIO



EXPOSE 3000/TCP

# docker run -it -p 3000:3000 -v <ruta_del_proyecto>:/home/dev <contenedor> bash
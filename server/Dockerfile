FROM python:3.8.11
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/share/backend
COPY requirements .
RUN pip install --upgrade pip
RUN pip install -r requirements
COPY . .

RUN python manage.py migrate

EXPOSE 9000
CMD ["python", "manage.py", "runserver", "0.0.0.0:9000"]
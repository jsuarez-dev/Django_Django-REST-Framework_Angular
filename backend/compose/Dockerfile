FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install -r /requirements.txt

COPY compose/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start

# Set work directory.
RUN mkdir /code
WORKDIR /code
COPY . /code/
# Copy project code.





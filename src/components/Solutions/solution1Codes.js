

export const nodejsSolution =
`'use strict';
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send('world');
});

app.get('/hello-json', (req, res) => {
  res.json({
    hello: 'world'
  });
});

app.listen(process.env.PORT, function () {
  console.log('READY');
});`;


export const rubySolution =
`require 'sinatra'
require 'json'

set :bind, '0.0.0.0'
set :port, ENV['PORT']

get '/hello' do
'world'
end

get '/hello-json' do
  content_type :json
  { :hello => 'world' }.to_json
end

Thread.new do
  sleep 1
  print 'READY'
  STDOUT.flush
end
`;


export const pythonSolution =
  `import time
import sys
import os
from flask import Flask
from flask import jsonify
from threading import Thread

app = Flask(__name__)

@app.route('/hello')
def hello():
    return 'world'

@app.route('/hello-json')
def helloJson():
    return jsonify(hello='world')

class readyThread(Thread):
    def run(self):
        time.sleep(1)
        sys.stdout.write('READY')
        sys.stdout.flush()

if __name__ == "__main__":
    readyThread().start()
    app.run(host='0.0.0.0', port=int(os.getenv('PORT')))`;


export const javaSolution =
  `import java.net.URI;
import java.net.URISyntaxException;
import com.google.gson.Gson;

import static spark.Spark.*;
import static spark.Spark.get;

class HelloMessage {
  public final String hello = "world";
}

public class Main {

  public static void main(String[] args) {
    port(Integer.valueOf(System.getenv("PORT")));
    Gson gson = new Gson();

    get("/hello", (req, res) -> "world");

    get("/hello-json", (req, res) -> {
        res.type("application/json");
        return new HelloMessage();
    }, gson::toJson);

    awaitInitialization();
    System.out.println("READY");
  }
}`;


export const dotnetSolution =
  `using Microsoft.Owin.Hosting;
using Owin;
using System;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Threading;
using System.Web.Http;

namespace App
{
    class Program
    {
        static void Main(string[] args)
        {
            WebApp.Start<App>(new StartOptions
            {
                Port = int.Parse(Environment.GetEnvironmentVariable("PORT")),
                ServerFactory = "Nowin"
            });
            Console.WriteLine("READY");

            Thread.Sleep(Timeout.Infinite);
        }
    }

    class App
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();
            app.UseWebApi(config);
        }
    }

    public class HelloWorldController : ApiController
    {

        [Route("hello")]
        [HttpGet]
        public HttpResponseMessage Hello()
        {
            var response = new HttpResponseMessage();
            response.Content = new StringContent("world", System.Text.Encoding.UTF8, "text/html");
            return response;
        }

        [Route("hello-json")]
        [HttpGet]
        public object HelloJson()
        {
            return new {hello = "world"};
        }
    }
}`;

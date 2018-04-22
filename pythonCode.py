from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
  print("Debug")
  return render_template("index.html")

@app.route("/scrape")
def scrape():
	print("Scrape")
	return render_template("app.js")

  
if __name__ == "__main__":
  app.run()
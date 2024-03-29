import React, { useState } from "react";
import { CodeBlock, atomOneDark} from 'react-code-blocks';
import { Link } from "react-router-dom";
import "./primary.css"



export default function Code() {
    const [which, setWhich] = useState('data')
    return (
        <div className=" flex pb-2 flex-col gap-8 items-center magicpattern3 font-poppins">
            <div className="w-[80%] px-4 h-full">
                <h1 className="text-center text-5xl font-bold text-white py-8">
                    Development Process
                </h1>
                <p className="pb-2  text-center ">
                <span className="bg-white  text-secondary text-md mx-2 px-2 cursor-pointer">
                <Link to={"/"}>Home</Link>
                    
                    </span>
            </p>
                <div>
                    <div className="flex gap-2 flex-row items-center">
                        <h1 onClick={()=>setWhich('data')} className={`text-2xl  font-fira text-[#f1f4fa] bg-[#282C34] mb-4  cursor-pointer hover:bg-[#f1f4fa] hover:text-[#282C34] transition-all duration-200 w-fit px-2 py-1 ${which === 'data' ? 'scale-105' : ''}`}>Web Scraping</h1>
                        <h1 onClick={()=>setWhich('back')} className={`text-2xl font-fira text-[#f1f4fa] bg-[#282C34] mb-4  cursor-pointer hover:bg-[#f1f4fa] hover:text-[#282C34] transition-all duration-200 w-fit px-2 py-1 ${which === 'back' ? 'scale-105' : ''}`}>Backend API</h1>
                    </div>
                    {
                        which === 'data' && <div className=" gap-2 text-md  flex flex-col">
                        <p className="bg-[#fffbfb] p-1 rounded-sm">I wrote a script in Python using BeautifulSoup in order to scrape the web for player data.</p>
                        <p className="bg-[#fffbfb] p-1 rounded-sm">The script fetches a Premier League statistics webpage using requests.</p>
                        <div className="font-fira">
                        <CodeBlock 
                            text={'# Scraping the webpage for HTML\nfrom bs4 import BeautifulSoup\nimport requests url = "https://fbref.com/en/comps/9/stats/Premier-League-Stats#all_stats_standard"\npage = requests.get(url)\nsoup = BeautifulSoup(page.content, "html.parser")\nhtmlData = "soup.txt" \nfile = open(htmlData, "w")\nfile.write(soup.prettify())\nfile.close()'}
                            language={'python'}
                            theme={atomOneDark}
                            
                            showLineNumbers={true}
                        />
                        </div>
                        <p className="bg-[#fffbfb] p-1 rounded-sm">The webpage is then parsed, stored, and formatted using Python.</p>
                        <div className="font-fira">
                        <CodeBlock 
                            text={'# Extract all rows from the table which contain the data we need\nunprocessedData = "unprocessedStandardPlayerData.txt"\nfile = open(htmlData, "r")\nf = open(unprocessedData, "w")\nfor line in file:\n    if line.find("data-append-csv") != -1:\n        f.write(line)\nfile.close()'}
                            language={'python'}
                            theme={atomOneDark}
                            
                            showLineNumbers={true}
                        />
                        </div>
                        <p className="bg-[#fffbfb] p-1 rounded-sm">Finally, the data is then stored in a MongoDB database.</p>
                        <div className="font-fira">
                        <CodeBlock 
                            text={'from pymongo.mongo_client import MongoClient\nfrom pymongo.server_api import ServerApi\nallPlayerData = open("playersData.txt", "r")\nuri = "mongodb/url"\nclient = MongoClient(uri, server_api=ServerApi("1"))\ndb = client["league"]\ncollection = db["player_stats"]\ni = 1\nfor line in allPlayerData:\n    squad = line.split(" ")\n    data = \n        # all data about the Player\n        collection.insert_one(data)\n    i += 1'}
                                
                            
                            language={'python'}
                            theme={atomOneDark}
                            
                            showLineNumbers={true}
                        />
                        </div>
                        <p className="bg-[#fffbfb] p-1 rounded-sm">The same process is repeated for the Squads.</p>
                        
                    </div>
                    }
                    {
                        which === 'back' && 
                        <div className=" gap-2 text-md  flex flex-col">
                            <p className="bg-[#fffbfb] p-1 rounded-sm">The backend is built with Node using ExpressJS</p>
                            <div className="font-fira">
                            <CodeBlock 
                                text={" # The code for Player and Squad data is very similar.\nrouter.get('/', async function (req, res, next) {\n    const data = await playerModal.find();\n    return res.json(data);\n});\nrouter.get('/:fname/:lname', async function (req, res, next) {\n    const data = await playerModal.find({'firstName':req.params.fname, 'lastName':req.params.lname});\n    return res.json(data);\n})\nrouter.get('/search', async function(req, res, next){\n    console.log(req.query)\n    let query = {}\n    if(req.query.lastName){\n        query.lastName = req.query.lastName\n    }\n    if(req.query.nation){\n        query.nation = req.query.nation\n    }\n    if(req.query.position){\n        query.position = req.query.position\n    }\n    if(req.query.squad){\n        query.squad = req.query.squad\n    }\n    const data = await playerModal.find(query);\n    return res.json(data);\n})"}
                                language={'javascript'}
                                theme={atomOneDark}
                                
                                showLineNumbers={true}
                            />
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
//use d3 library to read in samples.json from the URL 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function build_charts(sample_id){
    d3.json(url).then(function(data){
        console.log(data);
        let samples = data.samples;
        let result = samples.filter(item => item.id == sample_id)[0]
        console.log(result);

        let otu_ids = result.otu_ids;
        let values = result.sample_values;
        let labels = result.sample_otu_labels;

        let yticks = otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`)

        // bar chart
        let chart_data = [{
            x: values.slice(0,10).reverse(), 
            y: yticks, 
            type: "bar",
            orientation: "h",
        }]
        Plotly.newPlot('bar',chart_data)
        console.log(otu_ids);

        // bubble chart
        let bubble_chart = [{
            x: otu_ids,
            y: values,
            mode: 'markers',
            text: labels,
            marker: {
               color: otu_ids,
               size: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

            }
        }]
        Plotly.newPlot('bubble', bubble_chart)

    });
};
//individual demographics 
    function build_metadata(sample){ 
      d3.json(url).then(function(data){
        console.log(data);
        let Metasample = data.metadata.find(item=> item.id == sample);
        console.log(Metasample);
        let individual_demographics = d3.select("#sample-metadata")
        individual_demographics.html(" ")
        for (let metadata in Metasample ){
            (individual_demographics.append("h6").text(metadata + ":" + Metasample[metadata]));
        }
      })};

//• Create a function to populate metadata info inside the "box" I have on my webpage 
//First get the data by making an Api call
//Once the data comes in, inspect the data in the console
//Parse through the data to get the metadata info that I want from it
//Then append or put the key and values as a pair inside this box by referencing the id for this box on the webpage

function optionChanged(newSample){
    build_charts(newSample);
    build_metadata(newSample);
}

   

function init() {
    d3.json(url).then(function(data){
        console.log(data);
        let dropdown = d3.select('#selDataset');
    let names = data.names
    for (name in names){
        dropdown.append("option").text(names[name]);
    }

        
    dropdown.append("option").text("option1");
    let selectSample = "940"
    build_charts(selectSample);
    build_metadata(selectSample)
})};

init();




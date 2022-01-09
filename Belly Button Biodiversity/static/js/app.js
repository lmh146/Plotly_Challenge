// Read in Json File
async function main(){
    const response = await fetch("./samples.json");
    const data = await response.json();
    console.log(data);

    // Grab the samples information for each dictionary
    var samples = Object.values(data.samples);
    console.log(samples);
    var names = Object.values(data.names);
    console.log(names);
    var metadata = Object.values(data.metadata);
    console.log(metadata);

    // Loop through to Create Element for Metadata Demographics
    var selector = document.getElementById('selDataset');
    for(var i = 0; i < names.length; i++){
        let name = names[i];
        let el = document.createElement('option');
        let att = document.createAttribute("value");
        att.value = i;
        el.text = name;
        el.setAttributeNode(att);
        selector.add(el);
    };
    
    // Default Sample
    let sample_1 = samples[0];
    console.log(sample_1);

    // Metadata Info
    let metadata_samp = metadata[0];
    console.log(metadata_samp);
    let metadata_id = metadata_samp.id;
    console.log(metadata_id);
    let metadata_ethnic = metadata_samp.ethnicity;
    console.log(metadata_ethnic);
    let metadata_gen = metadata_samp.gender;
    console.log(metadata_gen);
    let metadata_age = metadata_samp.age;
    console.log(metadata_age);
    let metadata_loc = metadata_samp.location;
    console.log(metadata_loc);
    let metadata_bb = metadata_samp.bbtype;
    console.log(metadata_bb);
    let metadata_wfreq = metadata_samp.wfreq;
    console.log(metadata_wfreq);

    // Populate Metadata
    let meta_selector = document.getElementById('sample-metadata');
    let id_head = document.createElement('h5');
    id_head.textContent = `id: ${metadata_id}`
    let ethnic_head = document.createElement('h5');
    ethnic_head.textContent = `ethnicity: ${metadata_ethnic}`;
    let gen_head = document.createElement('h5');
    gen_head.textContent = `gender: ${metadata_gen}`;
    let age_head = document.createElement('h5');
    age_head.textContent = `age: ${metadata_age}`;
    let loc_head = document.createElement('h5');
    loc_head.textContent = `location: ${metadata_loc}`;
    let bb_head = document.createElement('h5');
    bb_head.textContent = `bbtype: ${metadata_bb}`;
    let wfreq_head = document.createElement('h5');
    wfreq_head.textContent = `wfreq: ${metadata_wfreq}`;
    meta_selector.append(id_head);
    meta_selector.append(ethnic_head);
    meta_selector.append(gen_head);
    meta_selector.append(age_head);
    meta_selector.append(loc_head);
    meta_selector.append(bb_head);
    meta_selector.append(wfreq_head);

    // Give Id Values to Metadata for Later
    id_head.setAttribute("id", "id");
    ethnic_head.setAttribute("id", "ethnic");
    gen_head.setAttribute("id", "gen");
    age_head.setAttribute("id", "age");
    loc_head.setAttribute("id", "loc");
    bb_head.setAttribute("id", "bb");
    wfreq_head.setAttribute("id", "wfreq");


    // Bar chart values
    let bar_values = sample_1.sample_values.sort((a,b) => b-a).slice(0,10).reverse();
    let bar_labels = sample_1.otu_labels.slice(0,10);
    let bar_id = sample_1.otu_ids.slice(0,10).map(label => `OTU ${label}`).reverse();

    // Plot Bar Graph
    let trace1 = {
        x: bar_values,
        y: bar_id,
        type: "bar",
        text: bar_labels,
        orientation: 'h',
    };

    let traceData = [trace1];

    Plotly.newPlot("bar", traceData);

    
    // Bubble Chart Values
    let bubble_x = sample_1.otu_ids;
    let bubble_y = sample_1.sample_values;
    let bubble_text = sample_1.otu_labels;
    

    // Plot Bubble Chart
    let trace2 = {
        x: bubble_x,
        y: bubble_y,
        text: bubble_text,
        mode: 'markers',
        marker: {
            color: bubble_x,
            size: bubble_y,
            colorscale: "Earth",
        }
    };

    let traceData2 = [trace2];

    let layout = {
        showlegend: false,
        height: 600,
        width: 800
    };

    Plotly.newPlot("bubble", traceData2);

    optionChanged();
}
main();

// Create Event Listener for Click on New Sample
let samp = document.querySelector('#selDataset').addEventListener("click", event => {
    document.querySelector("option").value;
});

// Create optionChanged Function
async function optionChanged(samp){ 
    // Read in JSON
    const response = await fetch("./samples.json");
    const data = await response.json();
    console.log(data);

    // Create Necessary Variables
    var samples = Object.values(data.samples);
    var names = Object.values(data.names);
    var metadata = Object.values(data.metadata);
    
    let cur_samp = samples[samp]
    let cur_meta = metadata[samp]

    // Check Variables
    console.log(cur_samp);
    console.log(cur_meta);

    // Collect Metadata for Current Sample
    let metadata_id = cur_meta.id;
    let metadata_ethnic = cur_meta.ethnicity;
    let metadata_gen = cur_meta.gender;
    let metadata_age = cur_meta.age;
    let metadata_loc = cur_meta.location;
    let metadata_bb = cur_meta.bbtype;
    let metadata_wfreq = cur_meta.wfreq;

    // Update Metadata to Current Sample
    let id_head = document.getElementById('id');
    id_head.textContent = `id: ${metadata_id}`
    let ethnic_head = document.getElementById('ethnic');
    ethnic_head.textContent = `ethnicity: ${metadata_ethnic}`;
    let gen_head = document.getElementById('gen');
    gen_head.textContent = `gender: ${metadata_gen}`;
    let age_head = document.getElementById('age');
    age_head.textContent = `age: ${metadata_age}`;
    let loc_head = document.getElementById('loc');
    loc_head.textContent = `location: ${metadata_loc}`;
    let bb_head = document.getElementById('bb');
    bb_head.textContent = `bbtype: ${metadata_bb}`;
    let wfreq_head = document.getElementById('wfreq');
    wfreq_head.textContent = `wfreq: ${metadata_wfreq}`;
    
    // Bar Chart Data Selected
    let bar_values = cur_samp.sample_values.sort((a,b) => b-a).slice(0,10).reverse();
    let bar_labels = cur_samp.otu_labels.slice(0,10);
    let bar_id = cur_samp.otu_ids.slice(0,10).map(label => `OTU ${label}`).reverse();

    // Bubble Chart Data for Selected
    let bubble_x = cur_samp.otu_ids;
    let bubble_y = cur_samp.sample_values;
    let bubble_text = cur_samp.otu_labels;

    // Plot Bar Graph
    let trace1 = {
        x: bar_values,
        y: bar_id,
        type: "bar",
        text: bar_labels,
        orientation: 'h',
    };

    let traceData = [trace1];

    Plotly.newPlot("bar", traceData);
    
    // Plot Bubble Chart
    let trace2 = {
        x: bubble_x,
        y: bubble_y,
        text: bubble_text,
        mode: 'markers',
        marker: {
            color: bubble_x,
            size: bubble_y,
            colorscale: "Earth",
        }
    };

    let traceData2 = [trace2];

    let layout = {
        showlegend: false,
        height: 600,
        width: 800
    };

    Plotly.newPlot("bubble", traceData2);
};

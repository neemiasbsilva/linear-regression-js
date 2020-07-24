const csv_to_json = require('csvtojson');
const file_system = require('fs');
const np = require
json_array = csv_to_json()
  .fromFile("./headbrain.csv")
  .then((source) => {
    // console.log(source.length);
    let X = [];
    let y = [];


    source.forEach(function (item, index, array) {
      X.push(item["Head Size(cm^3)"]);
      y.push(item["Brain Weight(grams)"]);
    });

    // X = tf.tensor(X);
    // y = tf.tensor(y);
    
    var sum_x = 0;
    var sum_y = 0;

    for (var i = 0; i < X.length; i++) {
        sum_x += parseInt(X[i], 10); //don't forget to add the base
        sum_y += parseInt(y[i], 10); //don't forget to add the base
    }

    var x_avg = sum_x / X.length;
    var y_avg = sum_y / y.length;

    // Calculate b0 and b1
    var i;
    var number = 0;
    var denom = 0;

    for (i = 0; i < X.length; i++){
        number += (X[i]-x_avg)*(y[i] - y_avg);
        denom += Math.pow((X[i] - x_avg), 2);
    }
    var b1 = number/denom;
    var b0 = y_avg - (b1 * x_avg);


    // console.log(b0, b1);

    var ss_t = 0;
    var ss_r = 0;

    for( i = 0; i < X.length; i++){
        let y_pred = b0 + b1 * X[i];
        ss_t += Math.pow((y[i] - x_avg),2);
        ss_r += Math.pow((y[i] - y_pred), 2);
    }

    const r2 = 1 - (ss_r/ss_t);

    console.log(r2);

  });

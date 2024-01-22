async function getData(data) {
  let my_obj = await fetch(data);
  let my_text = await my_obj.text();
  let jobs = JSON.parse(my_text);

  //THIS POPULATES THE CLASSIFICATION DROPDOWN OPTIONS IN THE SEARCH SECTION ON LOAD OF THE PAGE

  let jobs_classification = [];

  for (let i = 0; i < jobs.length; i++) {
    if (!jobs_classification.includes(jobs[i].classification)) {
      jobs_classification.push(jobs[i].classification);
    }
  }

  for (let i = 0; i < jobs_classification.length; i++) {
    let job_option =
      '<option value="' +
      jobs_classification[i] +
      '">' +
      jobs_classification[i] +
      "</option>";

    $("#classification").append(job_option);
  }

  //THIS POPULATES THE RESULTS SECTION ONCE THE SEARCH BUTTON IS CLICKED

  $(document).ready(function () {
    $("#job_form").submit(function (x) {
      $("#results_div").empty();
      $("#work-type").val("n/a");
      $("#salary-bracket").val("n/a");
      $("#time-posted").val("n/a");

      for (let i = 0; i < jobs.length; i++) {
        let condition_1 = $("#classification").val() == jobs[i].classification;
        let condition_2 = $("#job_keywords").val() == jobs[i].job_title;
        let condition_3 = $("#job_location").val() == jobs[i].location;

        if (condition_1 || condition_2 || condition_3) {
          let job_div =
            '<div class="col-lg-3 employer_div" data-bs-toggle="modal" data-bs-target="#work_' +
            jobs[i].id +
            '"><img src="img/' +
            jobs[i].image +
            '" class="img-fluid pt-2 mb-2" style="width: 80px" alt="company logo"/><h4>' +
            jobs[i].job_title +
            "</h4><h5>" +
            jobs[i].company +
            '</h5><p><img src="img/location_icon.png" alt="location icon" />' +
            jobs[i].location +
            '</p><p><img src="img/pesos_icon.png" alt="peso icon" />' +
            jobs[i].salary_range +
            '</p><p><img src="img/clock_icon.png" alt="clock icon" />' +
            jobs[i].type +
            '</p><p><img src="img/building_icon.png" alt="building icon" />' +
            jobs[i].classification +
            "</p><p>Posted " +
            jobs[i].time_posted +
            "</p></div>";

          let job_modal =
            '<div class="modal fade" id="work_' +
            jobs[i].id +
            '" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content"><div class="modal-header"><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row"><div class="col-lg-4" id="modal_left_div"><img src="img/' +
            jobs[i].image +
            '" style="width: 120px" class="mb-3" /><h3>' +
            jobs[i].job_title +
            '</h3><h5 class="mb-3">' +
            jobs[i].company +
            '</h5><p><img src="img/location_icon.png" />' +
            jobs[i].location +
            '</p><p><img src="img/pesos_icon.png" />' +
            jobs[i].salary_range +
            '</p><p><img src="img/clock_icon.png" />' +
            jobs[i].type +
            '</p><p><img src="img/building_icon.png" />' +
            jobs[i].classification +
            "</p><p>Posted " +
            jobs[i].time_posted +
            '</p><button class="btn btn_1" >Quick apply</button><button class="btn btn_2">Save</button></div><div class="col-lg-8" id="modal_right_div"><h5>QUALIFICATIONS</h5><ul><li>' +
            jobs[i].qualifications[0] +
            "</li><li>" +
            jobs[i].qualifications[1] +
            "</li><li>" +
            jobs[i].qualifications[2] +
            "</li><li>" +
            jobs[i].qualifications[3] +
            '</li></ul><h5 class="mt-4">DUTIES AND RESPONSIBILITIES</h5><ul><li>' +
            jobs[i].duties[0] +
            "</li><li>" +
            jobs[i].duties[1] +
            "</li><li>" +
            jobs[i].duties[2] +
            "</li><li>" +
            jobs[i].duties[3] +
            "</li></ul></div></div></div></div></div>";

          $("#results_div").append(job_div, job_modal);
        }
      }

      //THIS DIRECTS THE USER TO THE SIGN IN PAGE ONCE THEY CLICK THE 'QUICK APPLY' AND 'SAVE BUTTON'

      $(".btn_1, .btn_2").click(function () {
        window.location.href = "login.html";
      });

      //THIS PREVENTS THE PAGE FROM REFRESHING WHEN THE FORM IS SUBMITTED
      x.preventDefault();
    });

    //DROPDOWN FILTERS - THIS FILTERS THE SEARCH RESULTS

    $("#filter_form").change(function () {
      $("#results_div").empty();

      let filters = [];
      filters[0] = $("#classification").val();
      filters[1] = $("#work-type").val();
      filters[2] = $("#salary-bracket").val();
      filters[3] = $("#time-posted").val();

      //add new filters here
      for (let i = 0; i < jobs.length; i++) {
        let jobs_res = [];

        if (filters[0] != "n/a") {
          if (filters[0] == jobs[i].classification) {
            if (!jobs_res.includes(jobs[i])) {
              jobs_res.push(jobs[i]);
            }
          }
        }

        if (filters[1] != "n/a") {
          if (filters[1] == jobs[i].type) {
            if (!jobs_res.includes(jobs[i])) {
              jobs_res.push(jobs[i]);
            }
          }
        }

        if (filters[2] != "n/a") {
          if (filters[2] == jobs[i].salary_range) {
            if (!jobs_res.includes(jobs[i])) {
              jobs_res.push(jobs[i]);
            }
          }
        }

        if (filters[3] != "n/a") {
          if (filters[3] == jobs[i].time_posted) {
            if (!jobs_res.includes(jobs[i])) {
              jobs_res.push(jobs[i]);
            }
          }
        }

        if (filters[0] != "n/a") {
          if (filters[0] != jobs[i].classification) {
            jobs_res.splice(jobs[i]);
          }
        }
        if (filters[1] != "n/a") {
          if (filters[1] != jobs[i].type) {
            jobs_res.splice(jobs[i]);
          }
        }

        if (filters[2] != "n/a") {
          if (filters[2] != jobs[i].salary_range) {
            jobs_res.splice(jobs[i]);
          }
        }

        if (filters[3] != "n/a") {
          if (filters[3] != jobs[i].time_posted) {
            jobs_res.splice(jobs[i]);
          }
        }

        //match filters with json properties here

        for (let i = 0; i < jobs_res.length; i++) {
          let job_div =
            '<div class="col-lg-3 employer_div" data-bs-toggle="modal" data-bs-target="#job_' +
            jobs_res[i].id +
            '"><img src="img/' +
            jobs_res[i].image +
            '" class="img-fluid pt-2 mb-2" style="width: 80px" alt="company logo"/><h4>' +
            jobs_res[i].job_title +
            "</h4><h5>" +
            jobs_res[i].company +
            '</h5><p><img src="img/location_icon.png" alt="location icon" />' +
            jobs_res[i].location +
            '</p><p><img src="img/pesos_icon.png" alt="peso icon" />' +
            jobs_res[i].salary_range +
            '</p><p><img src="img/clock_icon.png" alt="clock icon" />' +
            jobs_res[i].type +
            '</p><p><img src="img/building_icon.png" alt="building icon" />' +
            jobs_res[i].classification +
            "</p><p>Posted " +
            jobs_res[i].time_posted +
            "</p></div>";

          let job_modal =
            '<div class="modal fade" id="job_' +
            jobs_res[i].id +
            '" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content"><div class="modal-header"><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row"><div class="col-lg-4" id="modal_left_div"><img src="img/' +
            jobs_res[i].image +
            '" style="width: 120px" class="mb-3" /><h3>' +
            jobs_res[i].job_title +
            '</h3><h5 class="mb-3">' +
            jobs_res[i].company +
            '</h5><p><img src="img/location_icon.png" />' +
            jobs_res[i].location +
            '</p><p><img src="img/pesos_icon.png" />' +
            jobs_res[i].salary_range +
            '</p><p><img src="img/clock_icon.png" />' +
            jobs_res[i].type +
            '</p><p><img src="img/building_icon.png" />' +
            jobs_res[i].classification +
            "</p><p>Posted " +
            jobs_res[i].time_posted +
            '</p><button class="btn btn_1" >Quick apply</button><button class="btn btn_2">Save</button></div><div class="col-lg-8" id="modal_right_div"><h5>QUALIFICATIONS</h5><ul><li>' +
            jobs_res[i].qualifications[0] +
            "</li><li>" +
            jobs_res[i].qualifications[1] +
            "</li><li>" +
            jobs_res[i].qualifications[2] +
            "</li><li>" +
            jobs_res[i].qualifications[3] +
            '</li></ul><h5 class="mt-4">DUTIES AND RESPONSIBILITIES</h5><ul><li>' +
            jobs_res[i].duties[0] +
            "</li><li>" +
            jobs_res[i].duties[1] +
            "</li><li>" +
            jobs_res[i].duties[2] +
            "</li><li>" +
            jobs_res[i].duties[3] +
            "</li></ul></div></div></div></div></div>";

          $("#results_div").append(job_div, job_modal);
        }
      }

      //THIS DIRECTS THE USER TO THE SIGN IN PAGE ONCE THEY CLICK THE 'QUICK APPLY' AND 'SAVE BUTTON'

      $(".btn_1, .btn_2").click(function () {
        window.location.href = "login.html";
      });
    });
  });
}

getData("https://mp2-protrove.onrender.com/api/jobs");

async function getData(data_1, data_2, data_3) {
  let my_obj = await fetch(data_1);
  let my_text = await my_obj.text();
  let jobs = JSON.parse(my_text);

  let my_obj2 = await fetch(data_2);
  let my_text2 = await my_obj2.text();
  let saved_jobs = JSON.parse(my_text2);

  let my_obj3 = await fetch(data_3);
  let my_text3 = await my_obj3.text();
  let applied_jobs = JSON.parse(my_text3);

  for (let i = 0; i < saved_jobs.length; i++) {
    for (let j = 0; j < jobs.length; j++) {
      if (saved_jobs[i].id == jobs[j].id) {
        let saved_job_div =
          '<div class="saj_jobs_items mb-2" data-bs-toggle="modal" data-bs-target="#sj_' +
          jobs[j].id +
          '"><h5>' +
          jobs[j].job_title +
          "</h5><p>" +
          jobs[j].company +
          "</p><p>Posted " +
          jobs[j].time_posted +
          "</p><p>" +
          jobs[j].location +
          '</p><p><img src="img/pesos_icon.png" />' +
          jobs[j].salary_range +
          "</p></div>";

        let saved_job_div_modal =
          '<div class="modal fade" id="sj_' +
          jobs[j].id +
          '" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content"><div class="modal-header"><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row"><div class="col-lg-4" id="modal_left_div"><img src="img/' +
          jobs[j].image +
          '" style="width: 120px" class="mb-3" /><h3>' +
          jobs[j].job_title +
          '</h3><h5 class="mb-3">' +
          jobs[j].company +
          '</h5><p><img src="img/location_icon.png" />' +
          jobs[j].location +
          '</p><p><img src="img/pesos_icon.png" />' +
          jobs[j].salary_range +
          '</p><p><img src="img/clock_icon.png" />' +
          jobs[j].type +
          '</p><p><img src="img/building_icon.png" />' +
          jobs[j].classification +
          "</p><p>Posted " +
          jobs[j].time_posted +
          '</p><button class="btn btn_1" >Quick apply</button><button class="btn" id="remove_sj">Remove</button></div><div class="col-lg-8" id="modal_right_div"><h5>QUALIFICATIONS</h5><ul><li>' +
          jobs[j].qualifications[0] +
          "</li><li>" +
          jobs[j].qualifications[1] +
          "</li><li>" +
          jobs[j].qualifications[2] +
          "</li><li>" +
          jobs[j].qualifications[3] +
          '</li></ul><h5 class="mt-4">DUTIES AND RESPONSIBILITIES</h5><ul><li>' +
          jobs[j].duties[0] +
          "</li><li>" +
          jobs[j].duties[1] +
          "</li><li>" +
          jobs[j].duties[2] +
          "</li><li>" +
          jobs[j].duties[3] +
          "</li></ul></div></div></div></div></div>";

        $("#saved_jobs_list").append(saved_job_div, saved_job_div_modal);
      }
    }
  }

  //THIS REMOVES THE SAVED JOB FROM THE LIST

  $("#remove_sj").click(function () {
    let h3_job_title = $(this).closest("#modal_left_div").find("h3").text();
    let h5_company = $(this).closest("#modal_left_div").find("h5").text();
    let p_location = $(this).closest("#modal_left_div").find("p:eq(0)").text();
    let p_salary = $(this).closest("#modal_left_div").find("p:eq(1)").text();
    let p_work_type = $(this).closest("#modal_left_div").find("p:eq(2)").text();
    let p_classification = $(this)
      .closest("#modal_left_div")
      .find("p:eq(3)")
      .text();

    for (let i = 0; i < jobs.length; i++) {
      if (
        h3_job_title == jobs[i].job_title &&
        h5_company == jobs[i].company &&
        p_location == jobs[i].location &&
        p_salary == jobs[i].salary_range &&
        p_work_type == jobs[i].type &&
        p_classification == jobs[i].classification
      ) {
        let sj_id = jobs[i].id;
        deleteData("https://mp2-protrove.onrender.com/api/saved_jobs/" + sj_id);
        alert("Job removed from saved list!");
        window.location.reload();
      }
    }
  });

  //THIS MOVES THE SAVED JOB TO THE APPLIED JOBS LIST WHEN QUICK APPLY IS CLICKED

  $(".btn_1").click(function () {
    let h3_job_title = $(this).closest("#modal_left_div").find("h3").text();
    let h5_company = $(this).closest("#modal_left_div").find("h5").text();
    let p_location = $(this).closest("#modal_left_div").find("p:eq(0)").text();
    let p_salary = $(this).closest("#modal_left_div").find("p:eq(1)").text();
    let p_work_type = $(this).closest("#modal_left_div").find("p:eq(2)").text();
    let p_classification = $(this)
      .closest("#modal_left_div")
      .find("p:eq(3)")
      .text();

    for (let i = 0; i < jobs.length; i++) {
      if (
        h3_job_title == jobs[i].job_title &&
        h5_company == jobs[i].company &&
        p_location == jobs[i].location &&
        p_salary == jobs[i].salary_range &&
        p_work_type == jobs[i].type &&
        p_classification == jobs[i].classification
      ) {
        let sj_id = jobs[i].id;
        deleteData("https://mp2-protrove.onrender.com/api/saved_jobs/" + sj_id);
        let job_applied = {
          id: sj_id,
        };
        putData(
          "https://mp2-protrove.onrender.com/api/applied_jobs",
          job_applied
        );
        alert("Job applied successfully!");
        window.location.reload();
      }
    }
  });

  for (let i = 0; i < applied_jobs.length; i++) {
    for (let j = 0; j < jobs.length; j++) {
      if (applied_jobs[i].id == jobs[j].id) {
        let applied_job_div =
          '<div class="saj_jobs_items mb-2" data-bs-toggle="modal" data-bs-target="#aj_' +
          jobs[j].id +
          '"><h5>' +
          jobs[j].job_title +
          "</h5><p>" +
          jobs[j].company +
          "</p><p>Posted " +
          jobs[j].time_posted +
          "</p><p>" +
          jobs[j].location +
          '</p><p><img src="img/pesos_icon.png" />' +
          jobs[j].salary_range +
          "</p></div>";

        let applied_job_div_modal =
          '<div class="modal fade" id="aj_' +
          jobs[j].id +
          '" tabindex="-1"><div class="modal-dialog modal-xl"><div class="modal-content"><div class="modal-header"><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="row"><div class="col-lg-4" id="modal_left_div"><img src="img/' +
          jobs[j].image +
          '" style="width: 120px" class="mb-3" /><h3>' +
          jobs[j].job_title +
          '</h3><h5 class="mb-3">' +
          jobs[j].company +
          '</h5><p><img src="img/location_icon.png" />' +
          jobs[j].location +
          '</p><p><img src="img/pesos_icon.png" />' +
          jobs[j].salary_range +
          '</p><p><img src="img/clock_icon.png" />' +
          jobs[j].type +
          '</p><p><img src="img/building_icon.png" />' +
          jobs[j].classification +
          "</p><p>Posted " +
          jobs[j].time_posted +
          '</p><button class="btn" id="remove_aj">Remove</button></div><div class="col-lg-8" id="modal_right_div"><h5>QUALIFICATIONS</h5><ul><li>' +
          jobs[j].qualifications[0] +
          "</li><li>" +
          jobs[j].qualifications[1] +
          "</li><li>" +
          jobs[j].qualifications[2] +
          "</li><li>" +
          jobs[j].qualifications[3] +
          '</li></ul><h5 class="mt-4">DUTIES AND RESPONSIBILITIES</h5><ul><li>' +
          jobs[j].duties[0] +
          "</li><li>" +
          jobs[j].duties[1] +
          "</li><li>" +
          jobs[j].duties[2] +
          "</li><li>" +
          jobs[j].duties[3] +
          "</li></ul></div></div></div></div></div>";

        $("#applied_jobs_list").append(applied_job_div, applied_job_div_modal);
      }
    }
  }

  //THIS REMOVES THE APPLIED JOB FROM THE LIST

  $("#remove_aj").click(function () {
    let h3_job_title = $(this).closest("#modal_left_div").find("h3").text();
    let h5_company = $(this).closest("#modal_left_div").find("h5").text();
    let p_location = $(this).closest("#modal_left_div").find("p:eq(0)").text();
    let p_salary = $(this).closest("#modal_left_div").find("p:eq(1)").text();
    let p_work_type = $(this).closest("#modal_left_div").find("p:eq(2)").text();
    let p_classification = $(this)
      .closest("#modal_left_div")
      .find("p:eq(3)")
      .text();

    for (let i = 0; i < jobs.length; i++) {
      if (
        h3_job_title == jobs[i].job_title &&
        h5_company == jobs[i].company &&
        p_location == jobs[i].location &&
        p_salary == jobs[i].salary_range &&
        p_work_type == jobs[i].type &&
        p_classification == jobs[i].classification
      ) {
        let aj_id = jobs[i].id;
        deleteData(
          "https://mp2-protrove.onrender.com/api/applied_jobs/" + aj_id
        );
        alert("Job removed from applied jobs list!");
        window.location.reload();
      }
    }
  });
}

getData(
  "https://mp2-protrove.onrender.com/api/jobs",
  "https://mp2-protrove.onrender.com/api/saved_jobs",
  "https://mp2-protrove.onrender.com/api/applied_jobs"
);

async function deleteData(data) {
  let req = await fetch(data, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  let res = await req.json();
  console.log(res);
}

async function putData(data, sj) {
  let req = await fetch(data, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sj),
  });
  let res = await req.json();
  console.log(res);
}

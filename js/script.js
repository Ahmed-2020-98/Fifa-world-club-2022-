//link 
const token = "42d22637282445f0a192919d7a821eb2";
const baseURL = "https://api.football-data.org/v4/competitions/2000";

function getStandings() {
  const url = `${baseURL}/standings`;
  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      const standings = response.data.standings;
      console.log(standings);
      for (standing of standings) {
        let tableContent = "";

        for (row of standing.table) {
          tableContent += `
                <li class="list-group-item">
                <div class="d-flex justify-content-around align-items-center">
                    <div style="min-width: 80px;">
                        <img class="rounded-circle shadow border" src="${row.team.crest}" style="width: 40px; height: 40px;" alt="">
                        <span>${row.team.tla}</span>
                    </div>
                    <div>${row.won}</div>
                    <div>${row.lost}</div>
                    <div>${row.draw}</div>
                    <div style="font-size: 16px;font-weight: 600;">${row.points}</div>
                </div>
              </li>
              `;
        }

        const content = `
            <div class="col px-3 mt-4 ">
                    <div class="card shadow-sm">
                        <div class="card-header text-center" style="background-color: #811538;color: #fff;font-size: 16px;font-weight: 700;">${standing.group}</div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item" style="background-color: #640E28;color: #fff;">
                            <div class="d-flex justify-content-around " style="height:15px;font-size: 14px;font-weight: 600;">
                                <div style="width:80px">team</div>
                                <div>W</div>
                                <div>L</div>
                                <div>D</div>
                                <div>Pts</div>
                            </div>
                          </li>
                          ${tableContent}
                        </ul>
                      </div>
                </div>           
            `;
        document.getElementById("standings").innerHTML += content;
      }
    });
}

getStandings();

import dateFns from "date-fns";
import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import { configueMoment } from "../configueMoment";
import { enregister } from "../redux/actions/rapportActivite";

class CalendarActivite extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    styleJourClick: "",
    buttonSelected: "NORMALE",
    styleAllClick: [],
    activiteJours: []
  };

  renderMonthName() {
    const dateFormat = "MMMM YYYY";
    const monthActive = this.props.activateMounth;

    return (
      <div className="header row flex-middle">
        <div className="col col-center">
          <span>
            {dateFns.format(monthActive.date, dateFormat)}
            {moment(this.state.currentMonth)
              .locale("fr")
              .format(dateFormat)}
          </span>
          <Button color="secondary" size="sm" onClick={() => this.gauche()}>
            gauche
          </Button>{" "}
          <Button color="secondary" size="sm" onClick={() => this.droite()}>
            droite
          </Button>{" "}
        </div>
      </div>
    );
  }

  renderJounName() {
    const dateFormat = "dddd";
    const monthActive = this.props.activateMounth;
    // ledebut de semain pour cette date
    let dateDebutSemaineOfDebutMois = dateFns.startOfWeek(
      this.state.currentMonth
    );

    const days = [0, 1, 2, 3, 4, 5, 6].map(i => (
      <span className="col col-center" key={i}>
        {moment(dateFns.addDays(dateDebutSemaineOfDebutMois, i))
          .locale("fr")
          .format(dateFormat)}
      </span>
    ));

    return <div className="days row">{days}</div>;
  }

  renderJours() {
    const monthActive = this.props.activateMounth.date;
    const { currentMonth, activiteJours } = this.state;
    // le debut de mois pour cette date
    const dateDebutMois = dateFns.startOfMonth(currentMonth);
    //la fin de mois pour cette date
    const dateFinMois = dateFns.endOfMonth(dateDebutMois);
    // le debut de mois pour cette date
    const dateDebutSemaineOfDebutMois = dateFns.startOfWeek(dateDebutMois);
    const finSemaineMois = dateFns.endOfWeek(dateFinMois);

    const rows = [];
    let days = [];
    let day = dateDebutSemaineOfDebutMois;
    let formattedDate = "";
    let arrayDay = [];

    while (day <= finSemaineMois) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, "D");

        let objetDay = {
          date: moment(day)
            .locale("fr")
            .format("DD-MM-YYYY"),
          heureDebut: "",
          nbHeures: 0,
          type: ""
        };
        arrayDay.push(objetDay);
        let arrayVerifier = activiteJours.map(jour => jour.date);
        let index = arrayVerifier.indexOf(objetDay.date);
        index === -1
          ? days.push(
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, dateDebutMois)
                    ? "disabled"
                    : objetDay.type
                }`}
                key={objetDay}
                onClick={this.jourClick(objetDay)}
              >
                <span className="number">{formattedDate}</span>
              </div>
            )
          : days.push(
              <div
                className={`col cell ${
                  !dateFns.isSameMonth(day, dateDebutMois)
                    ? "disabled"
                    : activiteJours[index].type
                }`}
                key={activiteJours[index]}
                onClick={this.jourClick(activiteJours[index])}
              >
                <span className="number">{formattedDate}</span>
              </div>
            );

        day = dateFns.addDays(day, 1);
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="body">{rows}</div>;
  }
  jourClick = jour => () => {
    let editeJour;
    jour.nbHeures === 0
      ? (editeJour = {
          ...jour,
          type: this.state.buttonSelected,
          nbHeures: 8,
          heureDebut: "9 h "
        })
      : jour.nbHeures === 8 && jour.heureDebut === "9 h "
      ? (editeJour = {
          ...jour,
          type: this.state.buttonSelected,
          nbHeures: 4,
          heureDebut: "9 h "
        })
      : jour.nbHeures === 4 && jour.heureDebut === "9 h "
      ? (editeJour = {
          ...jour,
          type: this.state.buttonSelected,
          nbHeures: 4,
          heureDebut: "14 h "
        })
      : (editeJour = {
          ...jour,
          type: "",
          nbHeures: 0,
          heureDebut: ""
        });

    if (this.state.activiteJours.length > 0) {
      let array = this.state.activiteJours.filter(
        obj => obj.date !== jour.date
      );

      this.setState({
        activiteJours: [...array, editeJour]
      });
    } else {
      this.setState({
        activiteJours: [
          ...this.state.activiteJours,
          {
            ...jour,
            type: this.state.buttonSelected,
            nbHeures: 8,
            heureDebut: "9 h "
          }
        ]
      });
    }
  };

  intrcontratClick = () => {
    this.setState({
      buttonSelected: "INTERCONTRAT"
    });
  };
  normaleClick = () => {
    this.setState({
      buttonSelected: "NORMALE"
    });
  };
  absenceClick = () => {
    this.setState({
      buttonSelected: "ABSENCE"
    });
  };
  droite = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };
  gauche = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
  selectToutClick = () => {
    // this.setState({
    //   activiteJours: this.state.styleJourClick.map(
    //     obj => (obj.type = this.state.buttonSelected)
    //   )
    // });
  };

  astraintClick = () => {
    this.setState({
      buttonSelected: "ASTREINTE"
    });
  };

  render() {
    const activateMounth = this.props.activateMounth;
    const { activiteJours } = this.state;

    return (
      <>
        <div className="App">
          <header>
            <div id="logo">
              <span>
                Rpport D'activité &nbsp;
                {moment(this.state.currentMonth)
                  .locale("fr")
                  .format("MMMM YYYY")}
              </span>
            </div>
          </header>

          <main>
            <div>
              <Button
                outline
                color="primary"
                size="sm"
                onClick={() => this.selectToutClick()}
              >
                SelecteAll : {this.state.buttonSelected}
              </Button>{" "}
              <Button
                color="warning"
                size="sm"
                onClick={() => this.intrcontratClick()}
              >
                Intercontrat
              </Button>{" "}
              <Button
                size="sm"
                color="success"
                onClick={() => this.normaleClick()}
              >
                Normale
              </Button>{" "}
              <Button
                color="secondary"
                size="sm"
                onClick={() => this.absenceClick()}
              >
                Absence
              </Button>{" "}
              <Button
                color="primary"
                size="sm"
                onClick={() => this.astraintClick()}
              >
                Astreinte/Sup
              </Button>{" "}
            </div>
            <div className="calendar">
              <div>
                <span> button selectionner: {this.state.buttonSelected}</span>
              </div>
              {this.renderMonthName()}
              {this.renderJounName()}
              {this.renderJours()}
            </div>
          </main>
          <div>
            <Button
              color="secondary"
              size="sm"
              onClick={() =>
                this.props.enregister({
                  paylod: activiteJours,
                  idRapport: activateMounth._id
                })
              }
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    activateMounth: state.rapportActivite.activateMounth
  };
};

export default connect(
  mapStateToProps,
  { enregister }
)(CalendarActivite);

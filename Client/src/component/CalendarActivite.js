import dateFns from "date-fns";
import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import moment from "moment";
import { configueMoment } from "../configueMoment";
import { enregister } from "../redux/actions/rapportActivite";

class CalendarActivite extends Component {
  state = {
    currentMonth: new Date(),
    styleJourClick: "",
    buttonSelected: "NORMALE",
    styleAllClick: [],
    activities: []
  };

  static getDeriveStateFromProps = (Props, State) => {
    if (this.State.activities !== this.Props.activities) {
      return {
        activities: [...this.Props.activities]
      };
    }

    return null;
  };

  componentDidMount = () => {
    this.setState({
      activities: this.props.activities
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.activities !== nextProps.activities) {
      return true;
    }
    return false;
  };

  componentDidUpdate = prevProps => {
    if (this.props.activities !== prevProps.activities) {
      this.setState({
        activities: this.props.activities
      });
    }
  };

  renderMonthName() {
    const dateFormat = "MMMM YYYY";
    const monthActive = this.props.rapportActivity;

    return (
      <div className="header row flex-middle">
        <div className="col col-center">
          <Button color="secondary" size="sm" onClick={() => this.gauche()}>
            gauche
          </Button>{" "}
          <span>
            {dateFns.format(monthActive.date, dateFormat)}
            {moment(this.state.currentMonth)
              .locale("fr")
              .format(dateFormat)}
          </span>
          <Button color="secondary" size="sm" onClick={() => this.droite()}>
            droite
          </Button>{" "}
        </div>
      </div>
    );
  }

  projectOfConsultant() {
    return (
      <div>
        <div id="list-project">
          <h2>List des Projets </h2>
        </div>
        <ListGroup id="list-project">
          {this.props.projectOfConsultant &&
          this.props.projectOfConsultant.length ? (
            this.props.projectOfConsultant.map(project => (
              <ListGroupItem key={project._id}>{project.title}</ListGroupItem>
            ))
          ) : (
            <ListGroupItem> Zsoft Consulting</ListGroupItem>
          )}
        </ListGroup>
      </div>
    );
  }

  renderJounName() {
    const dateFormat = "dddd";
    const monthActive = this.props.rapportActivity;
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
    const monthActive = this.props.rapportActivity.date;
    const { currentMonth, activities } = this.state;
    const dateDebutMois = dateFns.startOfMonth(currentMonth);
    const dateFinMois = dateFns.endOfMonth(dateDebutMois);
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
        let arrayVerifier = activities.map(jour => jour.date);
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
                    : activities[index].type
                }`}
                key={activities[index]}
                onClick={this.jourClick(activities[index])}
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

    if (this.state.activities.length > 0) {
      let array = this.state.activities.filter(obj => obj.date !== jour.date);

      this.setState({
        activities: [...array, editeJour]
      });
    } else {
      this.setState({
        activities: [
          ...this.state.activities,
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
    //   activities: this.state.styleJourClick.map(
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
    const { rapportActivity } = this.props;
    const { activities } = this.state;

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
            <div id="mail">
              <span>{this.props.mail}</span>
            </div>
          </header>

          <main>
            <dir className="list-project">{this.projectOfConsultant()}</dir>
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
                  paylod: activities,
                  idRapport: rapportActivity._id
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
    rapportActivity:
      state.rapportActivitiesReducer.currentRapportActivity.rapportActivity,
    activities:
      state.rapportActivitiesReducer.currentRapportActivity.activities,
    projectOfConsultant: state.project.projectOfConsultant,
    mail: state.register.user.mail
  };
};

export default connect(
  mapStateToProps,
  { enregister }
)(CalendarActivite);

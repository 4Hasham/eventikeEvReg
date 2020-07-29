# Date and Time Selection System

# Stakeholders

Eventike Team

# Purpose and Scope

The purpose of this system is to allow users to select the date and time of their event. The dates(s) could be a range of dates with the same time for every date or individually selected dates with variable time.

The system will allow Eventike application to manage the trade-offs that may get involved as the user selects the dates and time. The scope of this application goes beyond simply registration of an event.

This system will complement other features that are yet to come.

# Functional Requirements

Functional requirements involve the key behaviors of the system. Firstly, only valid "date and time selection" will be accepted and forwarded to database. Date and time will be deemed valid if the ending time is past the starting time.

Keeping in view the above mentioned point, the users will be allowed to select the dates by any one of the two methods.
1. The user will select a starting date and an ending date, the user's event will be held in that range of dates (starting and ending dates are inclusive). In this method of selection, the time of event, as selected by the user will be constant and same for all days.

Following fields will be present for the user to enter:
1. Starting Date.
2. Ending Date.
3. Starting time for each day.
4. Ending time for each day.

2. The user will select every date, along with the time range, individually. The user can add as many dates as they wish as far as the above mentioned provision is considered.
1. Date.
2. Starting time.
3. Ending time.

There will be two options available for the user: “Add Date”, “Delete Last Date”. The functions are self-explanatory.

The common field between the above mentioned two methods will be Time Zone selection.

All fields will be mandatory.

# Technical Requirements

A lot of automation will be involved, for example: the Time Zone of the user will be automatically selected through the moment API. The addition and deletion of dates (as described in part 2 of functional requirements) will be done dynnamically through the use of structural directives.
The validation and the text that goes to the server (which is the latter part of the project) is done with carefully calibrated nested if-else conditions. They are tested multiple time to assure proper working.

# Dependencies

1. Angular CLI 10.0.2
2. Moment API
3. Angular Material API
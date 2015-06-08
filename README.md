# Comprehension speed test
A web app for running speed tests on topic comprehension.

## How it works
A user 'hosts' a test competition. Players are invited into a lobby, where the host then sets the test parameters:

* the topic (e.g. Name as many colours in 3 minutes.)
* the list of possible answers (e.g. ['Blue', 'Red', 'Green'], etc)
* the victory conditions e.g. the max-time (3 minutes) or first-to-count (50)

Once the conditions are set and the players have 'ready-upped', the host can start the competition.

All players then race to enter as many possible answers within the victory conditions. After the victory conditions are met, the winner is announced.

## Requirements

* bower

## Installation

```
rvm use ruby-2.2.1
bundle install
nvm use 0.10
bower install
```

## Starting the dev server

```
middleman s
```

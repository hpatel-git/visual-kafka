Welcome to the visual-kafka wiki!

This is an open source thin client to consume and publish Kafka messages.It's build using ElectronJS and kafka-node. Following features are supported in visual-kafka
* Setup and Save Kafka Connections
* Add New Topic   
* Publish message to kafka partition
* Consume messages from kafka topic

### User's Guide
* [First Time Screen ](https://github.com/hpatel-git/visual-kafka/wiki/1.First-time-screen)
* [Add Connection](https://github.com/hpatel-git/visual-kafka/wiki/2.Add-Connection)
* [List of Connections](https://github.com/hpatel-git/visual-kafka/wiki/3.-List-of-Connections-screen)
* [Home Screen](https://github.com/hpatel-git/visual-kafka/wiki/4.-Home-Screen)
* [Add Topic](https://github.com/hpatel-git/visual-kafka/wiki/5.-Add-Topic)
* [Publisher](https://github.com/hpatel-git/visual-kafka/wiki/6.-Publisher)
* [Publish Success](https://github.com/hpatel-git/visual-kafka/wiki/7.-Publish-Success)
* [Consumer](https://github.com/hpatel-git/visual-kafka/wiki/8.-Consumer)

### Download release version 

* [For MAC OS ](https://github.com/hpatel-git/visual-kafka/releases/download/v1.0.1/VisualKafka-1.0.1.dmg)
* [For Widnows ](https://github.com/hpatel-git/visual-kafka/releases/download/v1.0.1/VisualKafka-Setup-1.0.1.exe)



### Build on Local
* Clone Visual Kafka source code
```
git clone git@github.com:hpatel-git/visual-kafka.git
```

* Build code using Yarn
```
yarn
```

* Start application for development
```
yarn dev
```

* Build release
```
yarn package
```

* Start application for release debug mode
```
DEBUG_PROD=true yarn build && DEBUG_PROD=true yarn start
```




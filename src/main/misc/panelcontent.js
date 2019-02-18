const React = require('react');

module.exports = {
  notes: {
    topic: "Misc Notes",
    icon: require("../../assets/notebook.jpg"),
    language: "English",
    link: "https://github.com/atcsrepo/Misc-notes",
    repo: "GitHub",
    text: "A collection of notes related to browser remote debugging, Docker set-up, Amazon Web Services deployment, reverse proxies, and other miscellaneous pieces of information. The collections serve as reference points and are not intended to be tutorials."
  },
  fecode: {
    topic: "Front-end Code",
    icon: require("../../assets/code.jpg"),
    language: "Javascript",
    link: "https://github.com/atcsrepo/Portfolio-main-standalone",
    repo: "GitHub",
    text: "A slightly modified version of the React code for this portfolio web application, which can be used to build a stand-alone instance of the page. For the online version, the code has been converted into a docker image and hosted on an Amazon Web Service EC2 instance."
  },
  collage: {
    topic: "Random web app",
    icon: require("../../assets/code.jpg"),
    language: "Javascript",
    link: "https://glitch.com/edit/#!/glaze-tank",
    repo: "Glitch",
    text: "A simple MERN project hosted on Glitch. The main goal was to play around with OAuth and the Masonry module. The live version can be accessed indirectly via the above link or through <a href='https://glaze-tank.glitch.me/' target='_blank'>here</a>. Not intended for mobile view."
  },
  dbtransfer: {
    topic: "MongoDB script",
    icon: require("../../assets/code.jpg"),
    language: "Javascript",
    link: "https://github.com/atcsrepo/DB-transfer-script",
    repo: "GitHub",
    text: "A simple set of scripts that can be used to collate multiple MongoDB databases into one or to transfer databases between servers."
  },
  lstm: {
    topic: "Long Short-Term Memory Network",
    icon: require("../../assets/ai.jpg"),
    language: "Python",
    link: "https://github.com/atcsrepo/AI-Algorithms/tree/master/LSTM",
    repo: "GitHub",
    text: "A basic python implementation of a LSTM network for text input, based off of this <a href='http://colah.github.io/posts/2015-08-Understanding-LSTMs/' target='_blank'>link</a> and <a href='https://gist.github.com/karpathy/d4dee566867f8291f086' target='_blank'>Karpathy's implementation</a> of a recurrent neural network."
  },
  ann: {
    topic: "Artificial Neural Network",
    icon: require("../../assets/ai.jpg"),
    language: "Python",
    link: "https://github.com/atcsrepo/AI-Algorithms/tree/master/ANN",
    repo: "GitHub",
    text: "Based off of Michael Nielson's Neural Networks and Deep Learning <a href='http://neuralnetworksanddeeplearning.com' target='_blank'>book</a>, which involves written digit identification. Includes additional modifications detailed within (e.g. basic learning rate regulators/early stop) and beyond (e.g. gradient check) the scope of the book."
  },
  cpcessay: {
    topic: "IoT + Blockchain Essay",
    icon: require("../../assets/crypto.jpg"),
    language: "English",
    link: "https://drive.google.com/file/d/127kgXT8mtCO_JATiA9ILM3Pn1kW-x0TF/view",
    repo: "Google Drive",
    text: "A high level overview of the Internet of Things plus blockchain space written for a CPChain community <a href='https://medium.com/@cpchain/cpchain-essay-awards-winners-announced-72c410868d70' target='_blank'>essay competition</a> in mid-2018."
  }
}
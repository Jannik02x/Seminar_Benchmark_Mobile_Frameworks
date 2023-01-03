import 'package:flutter/foundation.dart';
import 'package:flutter_benchmark/pi_calculator.dart';
import 'package:flutter/material.dart';
import 'common.dart';

const int _kNumIters = 100;

const int _gaussLegendreIterats = 10000000;

const int _borweinIterats = 1000000;

void main() {
  runApp(const Home());
}

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  String gaussLegendreTime = '';
  String borweinTime = '';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                  child: const Text('Gauss-Legendre'),
                  onPressed: pressGaussLegendreButton),
              Text('$gaussLegendreTime µs per iteration'),
              ElevatedButton(
                  child: const Text('Borwein'), onPressed: pressBorweinButton),
              Text('$borweinTime µs per iteration'),
            ],
          ),
        ),
      ),
    );
  }

  pressGaussLegendreButton() {
    final Stopwatch watch = Stopwatch();
    if (kDebugMode) {
      print('Pi calc tracker benchmark...');
    }
    watch.start();
    runGaussLegendreTest();
    watch.stop();
    final BenchmarkResultPrinter printer = BenchmarkResultPrinter();
    printer.addResult(
      description: 'Pi calc tracker',
      value: watch.elapsedMicroseconds / _kNumIters,
      unit: 'µs per iteration',
      name: 'iteration',
    );
    printer.printToStdout();
    setState(() {
      gaussLegendreTime = '${watch.elapsedMicroseconds / _kNumIters}';
    });
  }

  pressBorweinButton() {
    final Stopwatch watch = Stopwatch();
    if (kDebugMode) {
      print('Pi calc tracker benchmark...');
    }
    watch.start();
    runBorwein();
    watch.stop();
    if (kDebugMode) {
      final BenchmarkResultPrinter printer = BenchmarkResultPrinter();
      printer.addResult(
        description: 'Pi calc tracker',
        value: watch.elapsedMicroseconds / _kNumIters,
        unit: 'µs per iteration',
        name: 'iteration',
      );
      printer.printToStdout();
    }
    setState(() {
      borweinTime = '${watch.elapsedMicroseconds / _kNumIters}';
    });
  }

  runGaussLegendreTest() {
    PiCalculator calc = PiCalculator();
    for (int i = 0; i < _kNumIters; i += 1) {
      calc.gaussLegendre(_gaussLegendreIterats);
    }
  }

  runBorwein() {
    PiCalculator calc = PiCalculator();
    for (int i = 0; i < _kNumIters; i += 1) {
      calc.borwein(_borweinIterats);
    }
  }
}

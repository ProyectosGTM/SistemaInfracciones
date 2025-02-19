import { Component, OnInit } from '@angular/core';
import { transactions, lineColumAreaChart, revenueColumnChart, customerRadialBarChart, orderRadialBarChart, growthColumnChart} from './data';

import { ChartType } from './dashboard.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})

export class DefaultComponent implements OnInit {

  lineColumAreaChart: ChartType;
  revenueColumnChart: ChartType;
  orderRadialBarChart: ChartType;
  customerRadialBarChart: ChartType;
  growthColumnChart: ChartType;
  transactions;
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    /**
     * Fetches the data
     */
    this.fetchData();
    this.breadCrumbItems = [{ label: 'Sistema de Infracciones' }, { label: 'Dashboard', active: true }];
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    
    this.lineColumAreaChart = lineColumAreaChart;
    this.revenueColumnChart = revenueColumnChart;
    this.orderRadialBarChart = orderRadialBarChart;
    this.customerRadialBarChart = customerRadialBarChart;
    this.growthColumnChart = growthColumnChart;
    
    this.transactions = transactions;
  }

}

document.addEventListener('DOMContentLoaded', function() {
  const closeElement = document.querySelector('.close');
  if (closeElement) {
      closeElement.addEventListener('click', function() {
          const ulElement = document.querySelector('ul');
          if (ulElement) {
              ulElement.classList.toggle('active');
          }
      });
  }
});
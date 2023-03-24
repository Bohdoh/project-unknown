import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-decision-tree',
  templateUrl: './decision-tree.component.html',
  styleUrls: ['./decision-tree.component.css']
})



export class DecisionTreeComponent implements OnInit{

  private treeData : TreeNode= {
    name: 'Aasdasd as <br>' +
      'asdasd',
    children: [
      {
        name: 'Bsd asdasd asda sdas d',
        children: [
          { name: 'Dasd' },
          { name: 'Easdasdasdasd2wad' },
        ],
      },
      {
        name: 'C',
        children: [
          { name: 'F' },
          { name: 'G' },
        ],
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
    this.drawTree();
  }

  drawTree(): void {
    const margin = { top:40, right: 20, bottom: 20, left: 20 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('.binary-tree')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left + width / 2}, ${margin.top})`);



    const treeLayout = d3.tree().nodeSize([100, 100]);

    const root: d3.HierarchyNode<TreeNode> = d3.hierarchy<TreeNode>(this.treeData);

    const treeData = treeLayout(root as d3.HierarchyNode<unknown>);

    // Add the links
    const link = svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', (d: d3.HierarchyPointLink<any>) => d.source.x)
      .attr('y1', (d: d3.HierarchyPointLink<any>) => d.source.y)
      .attr('x2', (d: d3.HierarchyPointLink<any>) => d.target.x)
      .attr('y2', (d: d3.HierarchyPointLink<any>) => d.target.y)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);




    // Add the nodes
    const node = svg.selectAll<SVGGElement, d3.HierarchyPointNode<TreeNode>>('.node')
      .data<d3.HierarchyPointNode<TreeNode>>(treeData.descendants() as d3.HierarchyPointNode<TreeNode>[])
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: d3.HierarchyPointNode<TreeNode>) => `translate(${d.x}, ${d.y})`);


    // Add rectangles for the nodes
    node.append('rect')
      .attr('width', (d: d3.HierarchyPointNode<TreeNode>) => d.data.name.length * 8 + 10)
      .attr('height', 20)
      .attr('x', (d: d3.HierarchyPointNode<TreeNode>) => -(d.data.name.length * 8 + 10) / 2)
      .attr('y', -10)
      .attr('rx', 4)
      .attr('ry', 4)
      .style('fill', '#fff')
      .style('stroke', 'black')
      .style('stroke-width', 1);


// Add labels for the nodes
    node.append('text')
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d: d3.HierarchyPointNode<TreeNode>) => d.data.name);


  }









}

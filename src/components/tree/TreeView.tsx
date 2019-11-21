import * as d3 from 'd3';
import { hierarchy } from 'd3-hierarchy';
import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { FileContext } from '../../parsing/generated/ExpressionParser';
import { ASTNode } from '../../parsing/nodes/node';
import { RootState } from '../../stores/store';
import { getTree } from '../../stores/tree/selectors';
import './TreeView.scss';

interface Props {
    tree?: { tree: ASTNode[], ruleNames: string[] };
}

class TreeView extends React.Component<Props> {

    /* private tree = (data: ASTNode) => {
        const root = hierarchy(data);
        
        const treeLayout = d3.tree();
        treeLayout.size([400, 200]);
        treeLayout(root);
    } */

    private svg?: d3.Selection<SVGSVGElement | null, unknown, null, undefined>;
    private width = 1100;
    public render() {
        return (
            <Container fluid={true} className="TreeView">
                <svg
                    ref={(element) => this.svg = d3.select(element)}
                    width={'100%'}
                    height={'100%'}
                />
            </Container>
        );
    }

    public componentDidUpdate() {
        if (this.props.tree) {
            this.svg!.select('g').remove();
            this.chart(this.props.tree.tree[0]);
        } else {
            this.svg!.select('g').remove();
        }
    }

    public componentDidMount() {
        if (this.props.tree) {
            this.svg!.select('g').remove();
            this.chart(this.props.tree.tree[0]);
        } else {
            this.svg!.select('g').remove();
        }
    }

    private tree = (data: ASTNode & { dx?: number, dy?: number }) => {
        const root = hierarchy(data);
        root.data.dx = 10;
        root.data.dy = this.width / (root.height + 1);
        return d3.tree<ASTNode & { dx?: number, dy?: number }>()
            .nodeSize([root.data.dx, root.data.dy])(root);
    }

    private chart = (data: ASTNode) => {
        const root = this.tree(data);

        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
            if (d.x > x1) { x1 = d.x; }
            if (d.x < x0) { x0 = d.x; }
        });

        this.svg!
            // tslint:disable-next-line:no-any
            .attr('viewBox', [0, 0, this.width, x1 - x0 + root.data.dx! * 2] as any);

        const g = this.svg!.append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10)
            .attr('transform', `translate(${root.data.dy! / 3},${root.data.dx! - x0})`);

        const link = g.append('g')
            .attr('fill', 'none')
            .attr('stroke', '#555')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', 1.5)
            .selectAll('path')
            .data(root.links())
            .join('path')
            .attr(
                'd',
                d3.linkHorizontal()
                    // tslint:disable-next-line:no-any
                    .x((d) => (d as any).y)
                    // tslint:disable-next-line:no-any
                    .y((d) => (d as any).x) as any
            );

        const node = g.append('g')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-width', 3)
            .selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr('transform', (d) => `translate(${d.y},${d.x})`);

        node.append('circle')
            .attr('fill', (d) => d.children ? '#555' : '#999')
            .attr('r', 2.5);

        node.append('text')
            .attr('dy', '0.31em')
            .attr('x', (d) => d.children ? -6 : 6)
            .attr('text-anchor', (d) => d.children ? 'end' : 'start')
            .text((d) => d.data.name)
            .clone(true).lower()
            .attr('stroke', 'white');
    }
}

const mapStateToProps = (state: RootState) => ({
    tree: getTree(state),
});

export default connect(mapStateToProps)(TreeView);

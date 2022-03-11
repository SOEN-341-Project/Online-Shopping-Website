import Grid from '@mui/material/Grid';
import * as React from 'react';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TestData from '../TestValues.json';

class PriceBreakdown extends React.Component {
    constructor(props) {
        super(props);
        this.cart = TestData.cart;
    }

    render() {
        return (
            this.cart.map((item) => {
                return (
                    <Grid item xs={12} sx={{display: 'flex'}}>
                        <Grid item xs={6} sx={{overflowX: 'hidden'}}>
                            <p><em>{item.name}</em></p>
                        </Grid>
                        <Grid item xs={6} sx={{textAlign: 'right'}}>
                            <p>{item.quantity} x {item.price.toFixed(2)} Ɖ</p>
                        </Grid>
                    </Grid>
                );
            })
        )
    }
}

export class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: TestData.cart,
            alertVisible: false,
            GST: 0.00,
            QST: 0.00,
            subtotal: 0.00,
            total: 0.00
        }
    }

    calculateSubtotal() {
        let subtotalCalc = 0;

        this.state.cart.forEach((item, i) => {
            subtotalCalc += ((item.quantity) * (item.price));
        });
        this.setState({subtotal: subtotalCalc});

        return this.state.subtotal;
    }


/*    calculateTotal = () => {
        this.setState({total: this.state.subtotal + this.state.GST + this.state.QST});
        return this.state.total.toFixed(2);
    }*/

    render() {
        return (
            <Grid container className="Cart-Container">
                <Collapse in={this.state.alertVisible} className="Cart-Alert">
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.setState({alertVisible: false});
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        Order has successfully been placed.
                    </Alert>
                </Collapse>
                <Grid item xs={12} sx={{paddingBottom: '1rem'}}>
                    <h1 className='TextPink'>My Shopping Cart</h1>
                </Grid>
                <Grid item conatiner xs={12} lg={9} className="CartItemsContainer">
                    <ItemPreview cart={this.state.cart}/>
                </Grid>
                <Grid item xs={3} className="Cart-SideBanner">
                    <Grid item xs={12}>
                        <h3 className='TextGreen'>Subtotal</h3>
                        <PriceBreakdown/>
                        <hr/>
                        <h4 style={{margin: '1rem 0', textAlign: 'right'}}
                            className='TextGreen'> {this.state.subtotal} Ɖ
                        </h4>
                    </Grid>
                    <hr/>
                    <Grid item xs={12}>
                        <h3 className='TextGreen'>Total</h3>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', marginTop: '2rem'}}>
                        <Grid item xs={6}>
                            <h5 style={{margin: 0}}>GST: 5.0%</h5>
                        </Grid>
                        <Grid item xs={6}>
                            <h5 style={{marginTop: 0, textAlign: 'right'}}>{this.state.GST} Ɖ</h5>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', marginTop: 0}}>
                        <Grid item xs={6}>
                            <h5 style={{margin: 0}}>QST: 9.975%</h5>
                        </Grid>
                        <Grid item xs={6}>
                            <h5 style={{marginTop: 0, textAlign: 'right'}}>{this.state.QST} Ɖ</h5>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', marginTop: 0}}>
                        <Grid item xs={6}>
                            <h5 style={{margin: 0}}>Shipping</h5>
                        </Grid>
                        <Grid item xs={6}>
                            <h5 style={{marginTop: 0, textAlign: 'right'}} className='TextGreen'><em>Free</em></h5>
                        </Grid>
                    </Grid>
                    <hr/>
                    <Grid item xs={12}>
                        <h4 style={{margin: 0, textAlign: 'right'}} className='TextPink'>{this.state.subtotal + this.state.GST + this.state.QST} Ɖ</h4>
                    </Grid>
                    <Grid item xs={12} className="Cart-OrderButton">
                        <Button variant="contained" className="GreenButtonContained" onClick={function () {
                            this.setState({alertVisible: true});
                            window.scrollTo(0, 0);
                        }}>
                            Place order
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/" className='RoutingLink'>
                        <Button variant="text" className="Cart-ProductsBackButton">
                            <ArrowBackIosNewIcon/><h4>Return to products</h4>
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

const ItemPreview = (props) => {
    return (
        props.cart.map((item, i) => {
            return (
                <Grid>
                    <CartItem item={item} cart={props.cart}/>
                </Grid>
            );
        })
    )
}

class CartItem extends React.Component {
    constructor(props) {
        super(props);
    }

    IncrementItem = () => {
        if (this.props.item.quantity !== 10) {
            this.setState({quantity: this.props.item.quantity + 1});
        }
        this.props.cart[(this.props.item.id)].quantity += 1;
        // this.forceUpdate();
    }

    DecreaseItem = () => {
        if (this.props.item.quantity !== 1) {
            this.setState({quantity: this.props.item.quantity - 1});
        }
        this.props.cart[(this.props.item.id)].quantity -= 1;
        // this.forceUpdate();
    }

    RemoveItem = () => {
        delete this.props.cart[(this.props.item.id)];
        // this.forceUpdate();
    }

    render() {
        return (
            <Grid container className="CartItem">
                <Grid item sm={1} md={2} sx={{position: 'relative'}}>
                    <img className="CartItemImage" src={this.props.item.image} alt={this.props.item.name}/>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Grid item xs={12} lg={12} sx={{display: 'flex'}}>
                        <Grid item sm={9} md={11}>
                            <h3 style={{margin: '1rem 0'}}>{this.props.item.name}</h3>
                        </Grid>
                        <Grid item xs={3} md={1} sx={{margin: 'auto', textAlign: 'center'}}>
                            <Button className="Cart-CloseButton" onClick={this.RemoveItem}>
                                <CloseIcon/>
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} className='CartText'>
                        <Grid item xs={12} lg={3}>
                            <h4 style={{margin: 0}}>Seller:</h4>
                            <p style={{margin: '0.5rem 0'}}>{this.props.item.seller}</p>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <h4 style={{margin: 0}}>Brand:</h4>
                            <p style={{margin: '0.5rem 0'}}>{this.props.item.brand}</p>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <h4 style={{margin: 0}}>Price: {this.props.item.price} Ɖ</h4>
                            <h4>Promotion: 20% off</h4>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <div>
                                <h4 className="Cart-Quantity">Quantity</h4>
                                <Stack className="Cart-Quantity" direction="row" spacing={1}>
                                    <Button className="QuantityButtons-Shared PinkButtonContained" variant="contained"
                                            disabled={this.props.item.quantity === 1}
                                            onClick={this.DecreaseItem}>
                                        <RemoveIcon/>
                                    </Button>
                                    <input className="inputne" disabled={true} value={this.props.item.quantity}/>
                                    <Button className="QuantityButtons-Shared PinkButtonContained" variant="contained"
                                            disabled={this.props.item.quantity === 10}
                                            onClick={this.IncrementItem}>
                                        <AddIcon/>
                                    </Button>
                                </Stack>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

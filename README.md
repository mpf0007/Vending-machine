# Vending-machine
Little Project For Vending Machine

#build image
docker build . -t mpf/vendor_machine

#run image 
docker run -p 49160:4005  mpf/vendor_machine
docker run -p 49160:4005 -d mpf/vendor_machine

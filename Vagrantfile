# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/zesty64"
  config.vm.provision :shell, path: "vagrant_bootstrap.sh"
  config.vm.network :forwarded_port, guest: 3030, host: 3030
  config.vm.network :forwarded_port, guest: 3031, host: 3031
  config.vm.synced_folder '.', '/vagrant'

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "512"
  end


end

export class Sphere {
    geom = null;
    material = null;
    sphereMesh = null;
    static createSphere() {
        this.geom = new THREE.SphereGeometry(10, 8, 8);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.sphereMesh = new THREE.Mesh(this.geom, this.material);
        this.sphereMesh.position.set(1, 2, 3);
        return this;
    }
    static destroySphere() {
        this.geom.dispose();
        this.material.dispose();
    }
}

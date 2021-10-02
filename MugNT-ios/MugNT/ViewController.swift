//
//  ViewController.swift
//  MugNT
//
//  Created by Soum C. on 2/10/21.
//

import UIKit

let screenWidth = UIScreen.main.bounds.width
let screenHeight = UIScreen.main.bounds.height

var nlen = 0;
var mlen = 0;

class ViewController: UIViewController {

    let backgroundImage = UIImageView()
    let buttonOverlay = UIButton()
    let visualOverlay = UIView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        backgroundImage.frame = CGRect(x: 0.0, y: 0.0, width: screenWidth, height: screenHeight)
        backgroundImage.image = UIImage(named: "nearcmu")
        self.view.addSubview(backgroundImage)
        
        let f = reachText.split(separator: "\n")
        visualOverlay.frame = self.view.bounds
        self.view.addSubview(visualOverlay)
        buttonOverlay.frame = self.view.bounds
        buttonOverlay.addTarget(self, action: #selector(onClick), for: .touchUpInside)
        self.view.addSubview(buttonOverlay)
        
        
        
        var reachArray = [[Int]]();
        for x in f {
            let m = x.split(separator: " ")
            
            if m.count == 2 {
                nlen = Int(m[0])!
                mlen = Int(m[1])!
            }
            else {
                reachArray.append([Int]());
                for e in m {
                    reachArray[reachArray.count - 1].append(Int(e)!)
                }
            }
        }
        
        reach = reachArray
        
        print(nlen, mlen, screenHeight, screenWidth)
        
        
        
        
        
    }
    
    var coords = [CGPoint]()
    
    @objc func onClick(_ sender: Any, forEvent event: UIEvent) {
        let myButton = sender as! UIButton
        let touches = event.touches(for: myButton)
        let touch = touches?.first
        let touchPoint = touch?.location(in: myButton)
        coords.append(touchPoint! as! CGPoint)
        print(coords)
        if (coords.count >= 2) {
            replot()
        }
     }
    
    func replot() {
        for x in visualOverlay.subviews {
            x.removeFromSuperview()
        }
        
        let pxWidth = Float(screenWidth)/Float(mlen)
        let pxHeight = Float(screenHeight)/Float(nlen)
        
        let orig = coords[coords.count - 2]
        let dest = coords[coords.count - 1]
        
        let fx = Int(Float(orig.y) / pxHeight)
        let fy = Int(Float(orig.x) / pxWidth)
        let sx = Int(Float(dest.y) / pxHeight)
        let sy = Int(Float(dest.x) / pxWidth)
        
        var tre = makearray(n: nlen, m: mlen)
        for i in 0..<nlen {
            for j in 0..<mlen {
                tre[i][j] = 10
            }
        }
        let path = dijkstra(n: nlen, m: mlen, reach: reach, overlay: tre, x1_: fx, y1_: fy, x2_: sx, y2_: sy)
        
       
        
        print(path.count)
        for i in path {
            let xw = Float(i[0]) * pxHeight, yw = Float(i[1]) * pxWidth
            let smallBox = UIView()
            smallBox.frame = CGRect(x: CGFloat(yw), y: CGFloat(xw), width: CGFloat(pxWidth)+5, height: CGFloat(pxHeight)+5)
            smallBox.backgroundColor = .red
            visualOverlay.addSubview(smallBox)
        }
        
        let box = UIView(frame: CGRect(x: 20.0, y: 50.0, width: screenWidth-40.0, height: 180.0))
        box.backgroundColor = .white
        box.layer.cornerRadius = 10.0
        visualOverlay.addSubview(box)
        
        
    }


}

func makearray(n: Int, m: Int) -> [[Int]] {
    var x = [[Int]]();
    for i in 0..<n {
        x.append([Int]())
        for j in 0..<m {
            x[i].append(-1);
        }
    }
    return x
}

func abs(_ x: Int) -> Int {
    if (x < 0) {
        return -x
    }
    return x
}

func getSnap(n: Int, m: Int, reach: [[Int]], x: Int, y: Int) -> [Int] {
    var bestX = 0
    var bestY = 0
    var minD = 4 * n + 4 * m
    for i in 0..<n {
        for j in 0..<m {
            let d = abs(i - x) + abs(j - y)
            if (reach[i][j] == 1) {
                if (d < minD) {
                    minD = d
                    bestX = i
                    bestY = j
                }
            }
        }
    }
    return [bestX, bestY]
}

func dijkstra(n: Int, m: Int, reach: [[Int]], overlay: [[Int]], x1_: Int, y1_: Int, x2_: Int, y2_: Int) -> [[Int]] {
    
    var dist = makearray(n: n, m: m)
    var parsx = makearray(n: n, m: m)
    var parsy = makearray(n: n, m: m)
    
    ////////////
    
    print("Input: ", x1_, y1_, x2_, y2_)
    
    let snapped1 = getSnap(n: n, m: m, reach: reach, x: x1_, y: y1_)
    
    let x1 = snapped1[0]
    let y1 = snapped1[1]
    
    let snapped2 = getSnap(n: n, m: m, reach: reach, x: x2_, y: y2_)
    
    let x2 = snapped2[0]
    let y2 = snapped2[1]
    
    print("Snap: ", x1, y1, x2, y2)
    
    // return [[x1, y1], [x2, y2]]
    
    ////////////
    
    let maxInt = 2000000000;
    
    for i in 0..<n {
        for j in 0..<m {
            dist[i][j] = maxInt;
        }
    }
    
    var proc = Heap<[Int]>(sort: {$0[0] < $1[0]})
    
    proc.insert([0, x1, y1])
    
    let tolerance = 1
    
    while (!proc.isEmpty) {
        
        let top = proc.peek()!
        proc.remove()
        
        let d = top[0]
        let x = top[1]
        let y = top[2]
        
        if (dist[x][y] < d) {
            continue
        }
        
        dist[x][y] = d
        if (x == x2 && y == y2) {
            break
        }
        
        for i in -tolerance..<tolerance+1 {
            for j in -tolerance..<tolerance+1 {
                
                let nx = x + i
                let ny = y + j
                
                if (nx >= 0 && nx < n && ny >= 0 && ny < m && reach[nx][ny] == 1) {
                    if (dist[nx][ny] > d + overlay[nx][ny]) {
                        dist[nx][ny] = d + overlay[nx][ny]
                        proc.insert([d + overlay[nx][ny], nx, ny])
                        parsx[nx][ny] = x
                        parsy[nx][ny] = y
                    }
                }
                
            }
        }
        
        
    }
    
    var coords = [[Int]]()
    
    var cx = x2, cy = y2
    
    while (cx != x1 || cy != y1) {
        coords.append([cx, cy])
        let nx = parsx[cx][cy]
        let ny = parsy[cx][cy]
        cx = nx
        cy = ny
        if (cx == -1 || cy == -1) {
            return [[Int]]()
        }
    }
    
    return coords
    
}
